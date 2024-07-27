if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./student-course.db')
}


class StudentService {
    static add(student) {
        let students = JSON.parse(localStorage.getItem('students') || '[]');
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        return student;
    }

    static get(idOrNumber) {
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        return students.find(student => student.id === idOrNumber || student.number === idOrNumber);
    }

    static getAll() {
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        return students;
    }

    static update(student) {
        let students = JSON.parse(localStorage.getItem('students') || '[]');
        console.log('students:' , students);
        students = students.map(s => (s.id === student.id || s.number === student.number) ? student : s);
        console.log('students:' , students);
        localStorage.setItem('students', JSON.stringify(students));
        return student;
    }

    static delete(idOrNumber) {
        let students = JSON.parse(localStorage.getItem('students') || '[]');
        students = students.filter(student => student.id !== idOrNumber && student.number !== idOrNumber);
        localStorage.setItem('students', JSON.stringify(students));
    }
}
module.exports = StudentService;
