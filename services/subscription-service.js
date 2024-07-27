// const db = require('./database');
const StudentService = require('./student-service');
const CourseService = require('./course-service');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./student-subscription.db')
}

class SubscriptionService {
static add(subscription) {
    let savedStudent = StudentService.get(subscription.student.number);
    let savedCourse = CourseService.get(subscription.course.code);
    if(savedStudent === undefined || savedCourse === undefined){
        console.error('student or course not found for subscription: ' , subscription);
        throw Error('student or course not found for subscription !');
    }
    let subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    subscriptions.push(subscription);
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
}

static getByStudent(student) {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    return subscriptions.find(
        subscription => subscription.student.id === student.id 
        || subscription.student.number === student.number);
}
static getByCourse(course) {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    return subscriptions.find(
        subscription => subscription.course.id === course.id 
        || subscription.course.code === course.code);
}

static update(subscription) {
    let subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    console.log('subscriptions:' , subscriptions);
    subscriptions = subscriptions.map(
        s => (
            s.id === subscription.id 
            || (s.student.id === subscription.student.id && s.course.id === subscription.course.id)
            || (s.student.id === subscription.student.id && s.course.code === subscription.course.code)
            || (s.student.number === subscription.student.number && s.course.id === subscription.course.id)
            || (s.student.number === subscription.student.number && s.course.code === subscription.course.code)
            
        ) ? subscription : s);
    console.log('subscriptions:' , subscriptions);
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
}

static delete(id) {
    let subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    subscriptions = subscriptions.filter(subscription => subscription.id !== id );
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
}
}
module.exports = SubscriptionService;
