import { LocalStorage } from "node-localstorage";

if (typeof localStorage === "undefined" || localStorage === null) {
    global.localStorage = new LocalStorage('./course-course.db')
}



export default class CourseService {
    static coursesKey = "courses"

    static getCourseTable() {
        let table = localStorage.getItem(this.coursesTable) || "[]"
        return JSON.parse(table) || []
    }

    static coursesTable = this.getCourseTable()


    static updateCourseTable() {
        localStorage.setItem(this.coursesKey, JSON.stringify(this.coursesTable))
    }


    static add(course) {
        this.coursesTable.push(course)
        this.updateCourseTable()
        return course;
    }

    static get(idOrCode) {
        return this.coursesTable.find((course) => {
            return course.id === idOrCode || course.code === idOrCode
        })
    }

    static update(course) {
        let savedCourse = this.get(course.id) || this.get(course.code)
        course.id = savedCourse.id
        course.code = savedCourse.code
        return this.add(course);
    }

    static delete(idOrCode) {
        this.coursesTable = this.coursesTable.filter((course) => {
            return course.id !== idOrCode && course.code !== idOrCode
        })
        this.updateCourseTable()
    }
}