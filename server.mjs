import moment from 'moment';
let start = moment.now();

import { LocalStorage } from "node-localstorage";
import StudentService from './services/student-service.mjs';
import CourseService from './services/course-service.mjs';
import SubscriptionService from './services/subscription-service.mjs';

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

// ---TESTS---
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
    id: 4,
    name: "Ndofène DIOUF",
    number: "4A-B4"
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

SubscriptionService.add(
  {
    id: 1,
    student: {
      number: "1A-1B"
    },
    course: {
      code: "UE1"
    }
  }
);
console.log("Add/get subscription: " + SubscriptionService.getByStudent({ number: "1A-1B" }));

SubscriptionService.update(
  {
    id: 1,
    student: {
      number: "1A-1B"
    },
    course: {
      code: "UE1"
    },
    date: "27-07-2024"
  }
);
console.log("Update/get subscription: " + SubscriptionService.get(1));

SubscriptionService.add(
   {
    id: 2,
    student: {
      number: "2A-2B"
    },
    course: {
      code: "UE2"
    },
    date: "17-07-2025"
  }
);
SubscriptionService.add(
  {
    id: 3,
    student: {
      number: "3A-3B"
    },
    course: {
      code: "UE3"
    },
    date: "07-07-2025"
  }
);
SubscriptionService.delete(2);
console.log("Delete/get subscription: " + SubscriptionService.get(2));
SubscriptionService.delete("UE3");
console.log("Delete/get subscription: " + SubscriptionService.get("UE3"));

///======REST_API=======

//----Express--config----
const logger = (req, res, next) => {
  next()

  console.log(req.path, req.path)
  moment.locale('en-US');
  let date = moment().format(moment.defaultFormat);
  console.log(date + ' - ' + req.method + ' - ' + req.path + ' - ' + res.statusCode)
}

app.use(express.json()) // JSON config
app.use(logger) // Logger config/interceptor


//------REST-ENDPOINTS

// Student endpoints
app.get('/students', (req, res) => {
  let students = StudentService.getAll();
  let response = {
    status: students.length < 1 ? 404 : 200,
    body: students.length < 1 ? new Error("Student not found") : students
  }
  res.status(response.status)
    .send(response.body);
})

app.post('/students', (req, res) => {
  let student = req.body
  let savedStudent = StudentService.add(student);
  let response = {
    status: savedStudent.id === undefined ? 400 : 201,
    body: savedStudent.id === undefined ? new Error("Bad request body") : savedStudent
  }
  res.status(response.status)
    .send(response.body);
})

app.get('/students/:id', (req, res) => {
  var id = req.params.id;
  //   console.log("Student id: ", id)

  let student = StudentService.get(id);
  let response = {
    status: student === undefined ? 404 : 200,
    body: student === undefined ? new Error("Student not found") : student
  }
  res.status(response.status)
    .send(response.body);
})

app.put('/students/:id', (req, res) => {
  var id = req.params.id;
  //     console.log("Student id:", req.params.id)

  let student = {
    id: id,
    ...req.body
  }

  let savedStudent = StudentService.update(student);
  let response = {
    status: savedStudent.id === undefined ? 400 : 200,
    body: savedStudent.id === undefined ? new Error("Bad request body") : savedStudent
  }
  res.status(response.status)
    .send(response.body);
})

app.delete('/students/:id', (req, res) => {
  var id = req.params.id;

  //   console.log("Student id:", id)
  let student = StudentService.get(id);
  StudentService.delete(id);
  let response = {
    status: student === undefined ? 404 : 204,
    body: student === undefined ? new Error("Student not found") : student
  }
  res.status(response.status)
    .send(response.body);
})

//// TODO Course endpoints

//// TODO Subscription endpoints


app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
  let end = moment.now();
  let startupTimeMilis = end - start
  console.log("Started Express in " + (startupTimeMilis / 1000) + "s")
})