const db = require('./database');

class StudentService {
  static initialize() {
    db.run(`CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      number TEXT UNIQUE
    )`);
  }

  static add(student) {
    const { name, number } = student;
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO students (name, number) VALUES (?, ?)', [name, number], function(err) {
        if (err) {
          return reject(err);
        }
        resolve({ id: this.lastID, name, number });
      });
    });
  }

  static get(idOrNumber) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM students WHERE id = ? OR number = ?', [idOrNumber, idOrNumber], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  static update(student) {
    const { id, name, number } = student;
    return new Promise((resolve, reject) => {
      db.run('UPDATE students SET name = ?, number = ? WHERE id = ?', [name, number, id], function(err) {
        if (err) {
          return reject(err);
        }
        resolve({ id, name, number });
      });
    });
  }

  static delete(idOrNumber) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM students WHERE id = ? OR number = ?', [idOrNumber, idOrNumber], function(err) {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}

module.exports = StudentService;

// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./student-course.db')
// }


// class StudentService {
//     static add(student) {
//         let students = JSON.parse(localStorage.getItem('students') || '[]');
//         students.push(student);
//         localStorage.setItem('students', JSON.stringify(students));
//         return student;
//     }

//     static get(idOrNumber) {
//         const students = JSON.parse(localStorage.getItem('students') || '[]');
//         return students.find(student => student.id === idOrNumber || student.number === idOrNumber);
//     }

//     static getAll() {
//         const students = JSON.parse(localStorage.getItem('students') || '[]');
//         return students;
//     }

//     static update(student) {
//         let students = JSON.parse(localStorage.getItem('students') || '[]');
//         console.log('students:' , students);
//         students = students.map(s => (s.id === student.id || s.number === student.number) ? student : s);
//         console.log('students:' , students);
//         localStorage.setItem('students', JSON.stringify(students));
//         return student;
//     }

//     static delete(idOrNumber) {
//         let students = JSON.parse(localStorage.getItem('students') || '[]');
//         students = students.filter(student => student.id !== idOrNumber && student.number !== idOrNumber);
//         localStorage.setItem('students', JSON.stringify(students));
//     }
// }
// module.exports = StudentService;
