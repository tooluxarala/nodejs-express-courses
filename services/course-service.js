// const db = require('./database');
if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./student-course.db')
}

class CourseService {
    static add(course) {
        let courses = JSON.parse(localStorage.getItem('courses') || '[]');
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    static get(idOrCode) {
        const courses = JSON.parse(localStorage.getItem('courses') || '[]');
        return courses.find(course => course.id === idOrCode || course.code === idOrCode);
    }

    static update(course) {
        let courses = JSON.parse(localStorage.getItem('courses') || '[]');
        console.log('courses:' , courses);
        courses = courses.map(s => (s.id === course.id || s.code === course.code) ? course : s);
        console.log('courses:' , courses);
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    static delete(idOrCode) {
        let courses = JSON.parse(localStorage.getItem('courses') || '[]');
        courses = courses.filter(course => course.id !== idOrCode && course.code !== idOrCode);
        localStorage.setItem('courses', JSON.stringify(courses));
    }
}
module.exports = CourseService;
