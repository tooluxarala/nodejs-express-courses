const moment = require('moment')
const StudentService = require('./services/student-service');
const CourseService = require('./services/course-service');
const SubscriptionService = require('./services/subscription-service');
let start = moment.now();


const express = require('express')
const app = express()
const port = 3000



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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  let end = moment.now();
  let startupTimeMilis = end - start
  console.log("Started server in " + (startupTimeMilis / 1000) + "s")
})

console.log("New log before start !")
console.log("Hello ExPress !")

