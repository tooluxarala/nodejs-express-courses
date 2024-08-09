const StudentService = require('./services/student-service');
const CourseService = require('./services/course-service');
const SubscriptionService = require('./services/subscription-service');

const moment = require('moment');

let start = moment();

console.log("Hello Express!");
console.log("New log before start!");

const express = require('express');
const app = express();
const port = 3000;

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./student-course.db');
}

localStorage.setItem('name', 'Toolu Xarala');
console.log("Name: " + localStorage.getItem('name'));



















app.use(express.json());

app.post('/courses', (req, res) => {
  CourseService.add(req.body);
  res.status(201).send(req.body);
});

app.get('/courses', (req, res) => {
  const courses = JSON.parse(localStorage.getItem('courses')) || [];
  res.send(courses);
});

app.get('/courses/:id', (req, res) => {
  const course = CourseService.get(parseInt(req.params.id, 10));
  if (course) {
    res.send(course);
  } else {
    res.status(404).send('Course not found');
  }
});

app.put('/courses/:id', (req, res) => {
  CourseService.update({ ...req.body, id: parseInt(req.params.id, 10) });
  res.send(req.body);
});

app.delete('/courses/:id', (req, res) => {
  CourseService.delete(parseInt(req.params.id, 10));
  res.status(204).send();
});



app.post('/subscriptions', (req, res) => {
  try {
    SubscriptionService.add(req.body);
    res.status(201).send(req.body);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/subscriptions/courses/:courseId', (req, res) => {
  const subscriptions = SubscriptionService.getByCourse({ code: req.params.courseId });
  res.send(subscriptions);
});

app.get('/subscriptions/courses/:courseId/students', (req, res) => {
  const subscriptions = SubscriptionService.getByCourse({ code: req.params.courseId });
  const students = subscriptions.map(sub => sub.student);
  res.send(students);
});

app.get('/subscriptions/students/:studentId', (req, res) => {
  const subscriptions = SubscriptionService.getByStudent({ number: req.params.studentId });
  res.send(subscriptions);
});

app.get('/subscriptions/students/:studentId/courses', (req, res) => {
  const subscriptions = SubscriptionService.getByStudent({ number: req.params.studentId });
  const courses = subscriptions.map(sub => sub.course);
  res.send(courses);
});

app.delete('/subscriptions/:id', (req, res) => {
  SubscriptionService.delete(parseInt(req.params.id, 10));
  res.status(204).send();
});












app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  let end = moment();
  let startupTimeMilis = end - start;
  console.log("Started server in " + (startupTimeMilis / 1000) + "s");
});
