const db = require('./database');
const StudentService = require('./student-service');
const CourseService = require('./course-service');

class SubscriptionService {
  static initialize() {
    db.run(`CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      course_id INTEGER,
      date TEXT,
      FOREIGN KEY(student_id) REFERENCES students(id),
      FOREIGN KEY(course_id) REFERENCES courses(id)
    )`);
  }

  static add(subscription) {
    const { student, course, date } = subscription;
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO subscriptions (student_id, course_id, date) VALUES (?, ?, ?)',
        [student.id, course.id, date],
        function(err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID, student, course, date });
        }
      );
    });
  }

  static getByStudent(studentId) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT subscriptions.id, courses.* FROM subscriptions JOIN courses ON subscriptions.course_id = courses.id WHERE subscriptions.student_id = ?',
        [studentId],
        (err, rows) => {
          if (err) {
            return reject(err);
          }
          resolve(rows);
        }
      );
    });
  }

  static getByCourse(courseId) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT subscriptions.id, students.* FROM subscriptions JOIN students ON subscriptions.student_id = students.id WHERE subscriptions.course_id = ?',
        [courseId],
        (err, rows) => {
          if (err) {
            return reject(err);
          }
          resolve(rows);
        }
      );
    });
  }

  static update(subscription) {
    const { id, student, course, date } = subscription;
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE subscriptions SET student_id = ?, course_id = ?, date = ? WHERE id = ?',
        [student.id, course.id, date, id],
        function(err) {
          if (err) {
            return reject(err);
          }
          resolve({ id, student, course, date });
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM subscriptions WHERE id = ?', [id], function(err) {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}

module.exports = SubscriptionService;

// // const db = require('./database');
// const StudentService = require('./student-service');
// const CourseService = require('./course-service');

// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./student-subscription.db')
// }

// class SubscriptionService {
// static add(subscription) {
//     let savedStudent = StudentService.get(subscription.student.number);
//     let savedCourse = CourseService.get(subscription.course.code);
//     if(savedStudent === undefined || savedCourse === undefined){
//         console.error('student or course not found for subscription: ' , subscription);
//         throw Error('student or course not found for subscription !');
//     }
//     let subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
//     subscriptions.push(subscription);
//     localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
// }

// static getByStudent(student) {
//     const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
//     return subscriptions.find(
//         subscription => subscription.student.id === student.id 
//         || subscription.student.number === student.number);
// }
// static getByCourse(course) {
//     const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
//     return subscriptions.find(
//         subscription => subscription.course.id === course.id 
//         || subscription.course.code === course.code);
// }

// static update(subscription) {
//     let subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
//     console.log('subscriptions:' , subscriptions);
//     subscriptions = subscriptions.map(
//         s => (
//             s.id === subscription.id 
//             || (s.student.id === subscription.student.id && s.course.id === subscription.course.id)
//             || (s.student.id === subscription.student.id && s.course.code === subscription.course.code)
//             || (s.student.number === subscription.student.number && s.course.id === subscription.course.id)
//             || (s.student.number === subscription.student.number && s.course.code === subscription.course.code)
            
//         ) ? subscription : s);
//     console.log('subscriptions:' , subscriptions);
//     localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
// }

// static delete(id) {
//     let subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
//     subscriptions = subscriptions.filter(subscription => subscription.id !== id );
//     localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
// }
// }
// module.exports = SubscriptionService;
