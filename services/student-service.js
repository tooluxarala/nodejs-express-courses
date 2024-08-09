const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE students (id INT, name TEXT, number TEXT)");

  db.run("INSERT INTO students (id, name, number) VALUES (1, 'Pathé NDIAYE', '1A-B1')");
});

class StudentService {
  static add(student) {
    const stmt = db.prepare("INSERT INTO students (id, name, number) VALUES (?, ?, ?)");
    stmt.run(student.id, student.name, student.number);
    stmt.finalize();
  }

  static get(identifier) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM students WHERE id = ? OR number = ?", [identifier, identifier], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static update(student) {
    const stmt = db.prepare("UPDATE students SET name = ?, number = ? WHERE id = ?");
    stmt.run(student.name, student.number, student.id);
    stmt.finalize();
  }

  static delete(identifier) {
    const stmt = db.prepare("DELETE FROM students WHERE id = ? OR number = ?");
    stmt.run(identifier, identifier);
    stmt.finalize();
  }
}

module.exports = StudentService;
