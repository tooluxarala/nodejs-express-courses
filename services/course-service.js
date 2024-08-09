const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

class CourseService {
    static initialize() {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS courses (
                id INTEGER PRIMARY KEY,
                name TEXT,
                code TEXT UNIQUE,
                credits INTEGER
            )`);
        });
    }

    static add(course) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO courses (name, code, credits) VALUES (?, ?, ?)`;
            db.run(query, [course.name, course.code, course.credits], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, ...course });
                }
            });
        });
    }

    static get(identifier) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM courses WHERE id = ? OR code = ?`;
            db.get(query, [identifier, identifier], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static update(updatedCourse) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE courses SET name = ?, code = ?, credits = ? WHERE id = ?`;
            db.run(query, [updatedCourse.name, updatedCourse.code, updatedCourse.credits, updatedCourse.id], function (err) {
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
            const query = `DELETE FROM courses WHERE id = ? OR code = ?`;
            db.run(query, [identifier, identifier], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });
    }
}

// Initialize the database
CourseService.initialize();

// Example usage (you can remove or replace this with your actual usage)
CourseService.add({ name: "Mathematics", code: "MATH101", credits: 4 })
    .then(course => console.log("Course added:", course))
    .catch(err => console.error(err));

module.exports = CourseService;
