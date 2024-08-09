const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dir = path.resolve(__dirname);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const dbPath = path.resolve(__dirname, './student-course.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erreur lors de l\'ouverture de la base de données', err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');
    }
});

class SubscriptionService {
    static initialize() {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS subscriptions (
                id INTEGER PRIMARY KEY,
                studentNumber TEXT,
                courseCode TEXT,
                date TEXT,
                FOREIGN KEY(studentNumber) REFERENCES students(number),
                FOREIGN KEY(courseCode) REFERENCES courses(code)
            )`);
        });
    }

    static add(subscription) {
        return new Promise((resolve, reject) => {
            const studentQuery = `SELECT * FROM students WHERE number = ?`;
            const courseQuery = `SELECT * FROM courses WHERE code = ?`;
            
            db.get(studentQuery, [subscription.student.number], (err, student) => {
                if (err || !student) {
                    return reject('Étudiant invalide');
                }
                
                db.get(courseQuery, [subscription.course.code], (err, course) => {
                    if (err || !course) {
                        return reject('Cours invalide');
                    }
                    
                    const query = `INSERT INTO subscriptions (id, studentNumber, courseCode, date) VALUES (?, ?, ?, ?)`;
                    db.run(query, [subscription.id, subscription.student.number, subscription.course.code, subscription.date], function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ id: this.lastID, ...subscription });
                        }
                    });
                });
            });
        });
    }

    static getByStudent(student) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM subscriptions WHERE studentNumber = ?`;
            db.all(query, [student.number], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static getByCourse(course) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM subscriptions WHERE courseCode = ?`;
            db.all(query, [course.code], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static update(subscription) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE subscriptions SET studentNumber = ?, courseCode = ?, date = ? WHERE id = ?`;
            db.run(query, [subscription.student.number, subscription.course.code, subscription.date, subscription.id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });
    }

    static delete(identifier) {
        return new Promise((resolve, reject) => {
            const queryById = `DELETE FROM subscriptions WHERE id = ?`;
            const queryByCourseCodeOrStudentNumber = `DELETE FROM subscriptions WHERE courseCode = ? OR studentNumber = ?`;

            db.run(queryById, [identifier], function (err) {
                if (err) {
                    reject(err);
                } else if (this.changes === 0) {
                    db.run(queryByCourseCodeOrStudentNumber, [identifier, identifier], function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ changes: this.changes });
                        }
                    });
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });
    }
}

module.exports = SubscriptionService;
