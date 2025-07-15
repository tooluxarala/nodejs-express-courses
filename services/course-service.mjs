import { LocalStorage } from "node-localstorage";

if (typeof localStorage === "undefined" || localStorage === null) {
    global.localStorage = new LocalStorage('./course-course.db')
}



export default class CourseService {
    static coursesKey = "courses"

    static coursesTable = Array(localStorage.getItem(this.coursesKey)) || []

    static updatecourseTable() {
        localStorage.setItem(this.coursesKey, this.coursesTable)
    }


    static add(course) {
        this.coursesTable.push(course)
        this.updatecourseTable()
        return course;
    }

    static get(idOrCode) {
        return this.coursesTable.find((course) => {
            return course.id == idOrCode || course.code == idOrCode
        })
    }

    static update(course) {
        let savedcourse = this.get(course.id) || this.get(course.code)
        course.id = savedcourse.id
        course.code = savedcourse.code
        return this.add(course);
    }

    static delete(idOrCode) {
        this.coursesTable = this.coursesTable.filter((course) => {
            return course.id !== idOrCode && course.code !== idOrCode
        })
        this.updatecourseTable()
    }
}