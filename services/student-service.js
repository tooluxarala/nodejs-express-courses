// services/student-service.js

class StudentService {
    constructor() {
        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./student-course.db');
        }
    }

    static add(student) {
        localStorage[student.id] = JSON.stringify(student);
        localStorage[student.name] = JSON.stringify(student);
        localStorage[student.number] = JSON.stringify(student);
    }

    static get(idOrNumber) {
        return JSON.parse(localStorage[idOrNumber]);
    }

    static update(student) {
        let existingStudent = JSON.parse(localStorage[student.id]);
        
        if (existingStudent) {
            existingStudent.name = student.name;
            existingStudent.number = student.number;
            localStorage[student.id] = JSON.stringify(existingStudent);
            localStorage[student.name] = JSON.stringify(existingStudent);
            localStorage[student.number] = JSON.stringify(existingStudent);
        }
    }

    static delete(idOrNumber) {
        let student = JSON.parse(localStorage[idOrNumber]);
        if (student) {
            delete localStorage[student.id];
            delete localStorage[student.name];
            delete localStorage[student.number];
        }
    }
}

module.exports = StudentService;