const moment = require('moment')
let start = moment.now();

/// IMPORTS
const StudentService = require('./services/student-service');
const CourseService = require('./services/course-service');
const SubscriptionService = require('./services/subscription-service');
const express = require('express')
const app = express()
const port = 3000

/// CONSTANTE VALUES
const numberPattern = "[0-9]"


/// TESTS
StudentService.add({ id: 1, name: 'Pathé NDIAYE', number: '1A-B1' });
console.log("Add/get student: ", StudentService.get(1));
console.log("Add/get student: ", StudentService.get("1A-B1"));

StudentService.update({ id: 1, name: 'Ngoné DIENG', number: '1A-B1' });
console.log("Update/get student: ", StudentService.get(1));
console.log("Update/get student: ", StudentService.get("1A-B1"));

StudentService.add({ id: 2, name: 'Ndofène DIOUF', number: '2A-B2' });
StudentService.add({ id: 3, name: 'Lat DIOP', number: '3A-B3' });
StudentService.delete(2);
console.log("Delete/get student: ", StudentService.get(2));
StudentService.delete("3A-B3");
console.log("Delete/get student: ", StudentService.get("3A-B3"));



CourseService.add({ id: 1, name: 'Math', code: 'UE1' });
console.log("Add/get course: ", CourseService.get(1));
console.log("Add/get course: ", CourseService.get("UE1"));

CourseService.update({ id: 1, name: 'Math', code: 'UE1', credits: 7 });
console.log("Update/get course: ", CourseService.get(1));
console.log("Update/get course: ", CourseService.get("UE1"));

CourseService.add({ id: 2, name: 'Computer science', code: 'UE2', credits: 11 });
CourseService.add({ id: 3, name: 'English', code: 'UE3', credits: 5 });
CourseService.delete(2);
console.log("Delete/get course: ", CourseService.get(2));
CourseService.delete("UE3");
console.log("Delete/get course: ", CourseService.get("UE3"));

SubscriptionService.add(
    {
      id: 1,
      student: {
        number: "1A-B1"
      },
      course: {

        code: "UE1"
      }
    }
  );
  console.log("Add/get subscription: " , SubscriptionService.getByStudent({number: "1A-1B"}));


//// REST API

//// JSON serialisation config
app.use(express.json());
const jsonHeaderInterceptor =  (req, res, next) => {
  res.setHeader("Content-Type","application/json")
  if(req.header("Content-Type") !== "application/json"){
    res.status(415)
    .send(new Error("Unsupported media type"));
  }
  next()
}
app.use(jsonHeaderInterceptor);

//// Logging config
const logger =  (req, res, next) => {
  next()
  moment.locale('en-US');
  let date = moment().format(moment.defaultFormat);
  console.log(date + ' - ' + req.method + ' - ' + req.path + ' - ' + res.statusCode)
}
app.use(logger);

app.get('/', (req, res) => {
  res.send('Hollo Express !')
})

//// Student endpoints
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
  var id = req.params.id.match(numberPattern) ? parseInt(req.params.id) : req.params.id;

  console.log("id: ", id)
  let student = StudentService.get(id);
  let response = {
    status: student === undefined ? 404 : 200,
    body: student === undefined ? new Error("Student not found") : student
  }
  res.status(response.status)
  .send(response.body);
})

app.put('/students/:id', (req, res) => {
  var id = req.params.id.match(numberPattern) ? parseInt(req.params.id) : req.params.id;
  let student = req.body
  student.id = id

  let savedStudent = StudentService.update(student);
  let response = {
    status: savedStudent.id === undefined ? 400 : 200,
    body: savedStudent.id === undefined ? new Error("Bad request body") : savedStudent
  }
  res.status(response.status)
  .send(response.body);
})

app.delete('/students/:id', (req, res) => {
  var id = req.params.id.match(numberPattern) ? parseInt(req.params.id) : req.params.id;

  console.log("id: ", id)
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

/// SERVER START
app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
  let end = moment.now();
  let startupTimeMilis = end - start
  console.log("Started server in " + (startupTimeMilis / 1000) + "s")
})


