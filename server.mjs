import moment from 'moment';
let start = moment.now();

import { LocalStorage } from "node-localstorage";
import StudentService from './services/student-service.mjs';
import CourseService from './services/course-service.mjs';

import express from 'express'
const app = express()
const port = 3000

console.log("Hello Express !")
console.log("New log before start !")

if (typeof localStorage === "undefined" || localStorage === null) {
    global.localStorage = new LocalStorage('./student-course.db')
}

localStorage.setItem('name', 'Toolu Xarala')
console.log("Name: " + localStorage.getItem('name'))


StudentService.add(
    {
        id: 1,
        name: "Pathé NDIAYE",
        number: "1A-B1"
    }
);
console.log("Add/get student: " + StudentService.get(1).name);
console.log("Add/get student: " + StudentService.get("1A-B1").name);

StudentService.update(
    {
        id: 1,
        name: "Ngoné DIENG",
        number: "1A-B1"
    }
);
console.log("Update/get student: " + StudentService.get(1).name);
console.log("Update/get student: " + StudentService.get("1A-B1").name);

StudentService.add(
    {
        id: 2,
        name: "Ndofène DIOUF",
        number: "2A-B2"
    }
);
StudentService.add(
    {
        id: 3,
        name: "Lat DIOP",
        number: "3A-B3"
    }
);
StudentService.delete(2);
console.log("Delete/get student: " + StudentService.get(2));
StudentService.delete("3A-B3");
console.log("Delete/get student: " + StudentService.get("3A-B3"));

CourseService.add(
    {
        id: 1,
        name: "Math",
        code: "UE1"
    }
);
console.log("Add/get course: " + CourseService.get(1).name);
console.log("Add/get course: " + CourseService.get("UE1").name);

CourseService.update(
    {
        id: 1,
        name: "Math",
        code: "UE1",
        credits: 7
    }
);
console.log("Update/get course: " + CourseService.get(1).name);
console.log("Update/get course: " + CourseService.get("UE1").name);

CourseService.add(
    {
        id: 2,
        name: "Computer science",
        code: "UE2",
        credits: 11
    }
);
CourseService.add(
    {
        id: 3,
        name: "English",
        code: "UE3",
        credits: 5
    }
);
CourseService.delete(2);
console.log("Delete/get course: " + CourseService.get(2));
CourseService.delete("UE3");
console.log("Delete/get course: " + CourseService.get("UE3"));


///-----API---

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
    let end = moment.now();
    let startupTimeMilis = end - start
    console.log("Started Express in " + (startupTimeMilis / 1000) + "s")
})