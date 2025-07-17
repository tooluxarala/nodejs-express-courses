import { LocalStorage } from "node-localstorage";

if (typeof localStorage === "undefined" || localStorage === null) {
    global.localStorage = new LocalStorage('./student-course.db')
}



export default class StudentService {
    static studentsKey = "students"


    static getStudentsTable() {
        let table = localStorage.getItem(this.studentsKey) || "[]"
        return JSON.parse(table) || []
    }

    static studentsTable = this.getStudentsTable()


    static updateStudentTable() {
        localStorage.setItem(this.studentsKey, JSON.stringify(this.studentsTable))
    }


    static add(student) {
        this.studentsTable.push(student)
        this.updateStudentTable()
        return student;
    }
    static getAll() {
        return this.studentsTable
    }


    static get(idOrNumber) {
        return this.studentsTable.find((student) => {
            return student.id === idOrNumber || student.number === idOrNumber
        })
    }

    static update(student) {
        let savedStudent = this.get(student.id) || this.get(student.number)
        student.id = savedStudent.id
        student.number = savedStudent.number
        return this.add(student);
    }

    static delete(idOrNumber) {
        this.studentsTable = this.studentsTable.filter((student) => {
            return student.id !== idOrNumber && student.number !== idOrNumber
        })
        this.updateStudentTable()
    }
}