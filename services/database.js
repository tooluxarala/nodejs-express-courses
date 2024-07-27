// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./student-course.db')
// }
// class Database {
//     static save(entity, table) {
//         let courses = JSON.parse(localStorage.getItem('courses') || '[]');
//         courses.push(entity);
//         localStorage.setItem('courses', JSON.stringify(courses));
//     }

//     static get(idOrNumber) {
//         const courses = JSON.parse(localStorage.getItem('courses') || '[]');
//         return courses.find(entity => entity.id === idOrNumber || entity.number === idOrNumber);
//     }

//     static delete(idOrNumber) {
//         let courses = JSON.parse(localStorage.getItem('courses') || '[]');
//         courses = courses.filter(entity => entity.id !== idOrNumber && entity.number !== idOrNumber);
//         localStorage.setItem('courses', JSON.stringify(courses));
//     }
// }
// module.exports = Database;