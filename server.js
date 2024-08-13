const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');
const localStorage = require('node-localstorage').LocalStorage; // Pour simuler localStorage dans Node.js

// Import des services
const StudentService = require('./services/student-service');
const CourseService = require('./services/course-service');
const SubscriptionService = require('./services/subscription-service');

// Initialisation de localStorage (simule le stockage local dans Node.js)
const localStorageInstance = new localStorage('./scratch');

// Définition de la variable start pour mesurer le temps de démarrage
let start = moment.now();

// Création des instances des services
const studentService = new StudentService();
const courseService = new CourseService();
const subscriptionService = new SubscriptionService();

// Création de l'application Express
const app = express();
const port = 3000;

// Middleware pour le parsing du corps des requêtes en JSON
app.use(bodyParser.json());

// Endpoints pour les étudiants
app.post('/students', (req, res) => {
  try {
    const student = req.body;
    studentService.add(student);
    res.status(201).send('Student added successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.get('/students', (req, res) => {
  try {
    const students = studentService.getAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get('/students/:id', (req, res) => {
  try {
    const id = req.params.id;
    const student = studentService.get(id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put('/students/:id', (req, res) => {
  try {
    const id = req.params.id;
    const studentUpdates = req.body;
    studentUpdates.id = id; // Assurer que l'ID est présent dans les mises à jour
    studentService.update(studentUpdates);
    res.status(200).send('Student updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete('/students/:id', (req, res) => {
  try {
    const id = req.params.id;
    studentService.delete(id);
    res.status(200).send('Student deleted successfully');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Endpoints pour les cours
app.post('/courses', (req, res) => {
  try {
    const course = req.body;
    CourseService.add(course);
    res.status(201).send('Course added successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/courses', (req, res) => {
  try {
    const courses = CourseService.getAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/courses/:id', (req, res) => {
  try {
    const id = req.params.id;
    const course = CourseService.get(id);
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).send('Course not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put('/courses/:id', (req, res) => {
  try {
    const id = req.params.id;
    const courseUpdates = req.body;
    courseUpdates.id = id; // Assurer que l'ID est présent dans les mises à jour
    CourseService.update(courseUpdates);
    res.status(200).send('Course updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete('/courses/:id', (req, res) => {
  try {
    const id = req.params.id;
    CourseService.delete(id);
    res.status(200).send('Course deleted successfully');
  } catch (error) {
    res.status(404).send(error.message);
  }
});
// Endpoints pour les inscriptions
app.post('/subscriptions', (req, res) => {
  try {
    const subscription = req.body;
    SubscriptionService.add(subscription);
    res.status(201).send('Subscription added successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.get('/subscriptions/courses/:courseId', (req, res) => {
  try {
    const courseId = req.params.courseId;
    const subscriptions = SubscriptionService.getByCourse({ id: courseId });
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get('/subscriptions/courses/:courseId/students', (req, res) => {
  try {
    const courseId = req.params.courseId;
    const students = SubscriptionService.getStudentsByCourse({ id: courseId });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get('/subscriptions/students/:studentId', (req, res) => {
  try {
    const studentId = req.params.studentId;
    const subscriptions = SubscriptionService.getByStudent({ id: studentId });
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/subscriptions/students/:studentId/courses', (req, res) => {
  try {
    const studentId = req.params.studentId;
    const courses = SubscriptionService.getCoursesByStudent({ id: studentId });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.delete('/subscriptions/:id', (req, res) => {
  try {
    const id = req.params.id;
    SubscriptionService.delete(id);
    res.status(200).send('Subscription deleted successfully');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Configuration et démarrage du serveur Express
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  let end = moment.now();
  let startupTimeMillis = end - start;
  console.log("Started server in " + (startupTimeMillis / 1000) + "s");
});
