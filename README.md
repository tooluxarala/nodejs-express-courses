# Express
Ce projet est une serie d'exercices pour apprendre et se familiariser avec Express. La documentation d'Express ce trouve à cette addresse: https://expressjs.com/
- Elle traite de l'inscription d'étudiants à des cours dispensés à l'école tels celui sur Node.js

## I. Initialisation du projet
### 1 - Ajouter NPM au projet 
- Executer la commande ``npm init`` :
```
package name: nodejs-express-courses 
version: (1.0.0) 
description: A Node.js Express course API
entry point: server.mjs
test command: 
git repository: 
keywords: Node.js, Express,Scolar
author: Toolu Xarala
license: (ISC) Apache-2.0

```
- Vérifier que le fichier ``package.json`` est créé avec les bonnes valeurs
```
{
  "name": "nodejs-express-courses",
  "version": "1.0.0",
  "description": "A Node.js Express course API",
  "main": "server.mjs",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.mjs"
  },
  "keywords": [
    "Node.js",
    "Express",
    "Scolar"
  ],
  "author": "Toolu Xarala",
  "license": "Apache-2.0"
}
```
- Vérifier également que le fichier ``package-lock.json`` est bien créée. Ce fichier est généré et gèré par NPM donc pas besoin d'y toucher. Il contient toute la hiérachie des dépendances et doit être commité sur Git.
- Créer le fichier ``entry point`` ``server.mjs`` et ajouter le log ``console.log("Hello Express !")``
- lancer le programme avec ``npm start`` et vérifier que le message ``"Hello Express !"`` apparaît dans le terminal.

### 2 - Ajouter la librairie Nodemon en mode developpement pour faire du hot-reloading
- Documentation: https://github.com/remy/nodemon#nodemon
- Executer la commande ``npm install nodemon --save-dev``
- Vérifier que la dépendance de développement ``nodemon``est bien créée dans le fichier ``package.json``:
```
 "devDependencies": {
    "nodemon": "^3.1.4"
  }

```
- Vérifier que le dossier des dépendances ``node_modules`` est bien créé et contient ``Nodemon``. Ce dossier est créé et gèré par NPM, donc pas besoin d'y toucher. C'est un dossier à ne surtout pas commiter dans Git. 
- Modifier le start script pour utiliser ``Nodemon`` :
```
  "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "nodemon server.mjs"
  }
```
- lancer le programme avec ``npm start`` 
- Ajouter le log ``console.log("New log before start !")`` au début du fichier ``server.mjs`` et enregistrer.
- Vérifier que le programme redémare automatiquement dans le terminal. Le nouveau log doit apparaître dans le terminal.

### 3 - Ajouter la librairie monment.mjs pour calculer le temps de démarrage du server
- Documentation: https://momentjs.com/docs/
- Executer la commande ``npm install moment``
- Vérifier que la dépendance ``moment`` est bien créée dans le fichier ``package.json``:
```
  "dependencies": {
    "moment": "^2.30.1"
  }

```
- Ajouter ce code snippet au début du fichier ``server.mjs``:

```
import moment from 'moment'

let start = moment.now();

```
- Ajouter ce code snippet à la fin du fichier ``server.mjs``:

```
let end = moment.now();
  let startupTimeMilis = end - start
  console.log("Started server in " + (startupTimeMilis / 1000) + "s")

```
- Enregistrer le fichier. Vérifier que le log de démarrage ``"Started server in ...s"`` apparaît dans le terminal.
### 4 - Ajouter la librairie Local-storage pour stocker les informations dans le disk
- Documentation: https://www.npmjs.com/package/node-localstorage
- Executer la commande ``npm i node-localstorage``
- Vérifier que la dépendance ``node-localstorage`` est bien créée dans le fichier ``package.json``
- Ajouter ce code snippet au début du fichier ``server.mjs``:

```
import { LocalStorage } from "node-localstorage";

if (typeof localStorage === "undefined" || localStorage === null) {
    global.localStorage = new LocalStorage('./student-course.db')
}

localStorage.setItem('name', 'Toolu Xarala')
console.log("Name: " + localStorage.getItem('name'))

```
- Enregistrer le fichier. Vérifier que le log de démarrage ``"Name: Toolu Xarala"`` apparaît dans le terminal.
### 5 - Installation de Express
- Documentation: https://expressjs.com/
- Executer la commande ``npm i express``
- Vérifier que la dépendance ``express`` est bien créée dans le fichier ``package.json``
- Ajouter/Mettre ce code snippet au début du fichier ``server.mjs`` après la partie moment.js:
  ```
  import express from 'express'
  const app = express()
  const port = 3000
  ```

- Ajouter/Mettre à jour ce code snippet dans le fichier ``server.mjs``:

```
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
  let end = moment.now();
  let startupTimeMilis = end - start
  console.log("Started Express in " + (startupTimeMilis / 1000) + "s")
})

```
- Enregistrer le fichier. Vérifier que le log de démarrage ``"Started Express in ...s"`` apparaît dans le terminal.

## II. Logique métier
### 1 - Créer le service de gestion des étudiants (CRUD) - Create - Read - Update - Delete
- Créer un dossier ``services`` à la racine du projet
- Créer le fichier ``student-service.mjs`` dans le dossier ``services`` et ajouter la class ``StudentService``
- Ajouter une methode de class ``StudentService.add(student)`` qui permet stocker les infomations d'un étudiant (``id,name,number``) dans le ``localStorage``
- Ajouter une methode de class ``StudentService.get([id or number])`` qui permet de lire les infomations d'un étudiant (``id,name,number``) dans le ``localStorage``
  - Tester la methode en important la class ``StudentService`` dans `server.mjs` et ajouter ce snipet après les imports:
    ```
    StudentService.add(
      {
        id: 1,
        name: "Pathé NDIAYE",
        number: "1A-B1"
      }
    );
    console.log("Add/get student: " + StudentService.get(1).name);
    console.log("Add/get student: " + StudentService.get("1A-B1").name);
    ```
  - Verifier que les deux logs apparaît dans le terminal
- Ajouter une methode de class ``StudentService.update(student)`` qui permet de mettre à jour les infomations d'un étudiant (``id,name,number``) dans le ``localStorage``
  - Tester la methode en ajoutant ce snipet dans ``server.mjs``:
    ```
    StudentService.update(
      {
        id: 1,
        name: "Ngoné DIENG",
        number: "1A-B1"
      }
    );
    console.log("Update/get student: " + StudentService.get(1).name);
    console.log("Update/get student: " + StudentService.get("1A-B1").name);
    ```
  - Verifier que les deux logs apparaît dans le terminal
- Ajouter une methode de class ``StudentService.delete([id or number])`` qui permet de supprimer les infomations d'un étudiant (``id,name,number``) du ``localStorage``
  - Tester la methode en ajoutant ce snipet dans ``server.mjs``:
    ```
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
    ```
  - Verifier que les deux logs ``undefined`` apparaît dans le terminal
  ### 2 - Créer le service de gestion des cours
- Créer le fichier ``course-service.mjs`` dans le dossier ``services`` et ajouter la class ``CourseService``
- Ajouter une methode de class ``CourseService.add(course)`` qui permet stocker les infomations d'un cours (``id,name,code, credits``) dans le ``localStorage``
- Ajouter une methode de class ``CourseService.get([id or code])`` qui permet de lire les infomations d'un cours (``id,name,code,credits``) dans le ``localStorage``
  - Tester la methode en important la class ``CourseService`` dans `server.mjs` et ajouter ce snipet après les imports:
    ```
    CourseService.add(
      {
        id: 1,
        name: "Math",
        code: "UE1"
      }
    );
    console.log("Add/get course: " + CourseService.get(1).name);
    console.log("Add/get course: " + CourseService.get("UE1").name);
    ```
  - Verifier que les deux logs apparaît dans le terminal
- Ajouter une methode de class ``CourseService.update(course)`` qui permet de mettre à jour les infomations d'un cours (``id,name,code,credits``) dans le ``localStorage``
  - Tester la methode en ajoutant ce snipet dans ``server.mjs``:
    ```
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
    ```
  - Verifier que les deux logs apparaît dans le terminal
- Ajouter une methode de class ``CourseService.delete([id or code])`` qui permet de supprimer les infomations d'un cours (``id,name,code,credits``) du ``localStorage``
  - Tester la methode en ajoutant ce snipet dans ``server.mjs``:
    ```
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
    ```
  - Verifier que les deux logs ``undefined`` apparaît dans le terminal

### 3 - Créer le service de gestion des inscriptions aux cours
- Créer le fichier ``subscription-service.mjs`` dans le dossier ``services`` et ajouter la class ``SubscriptionService``
- Ajouter une methode de class ``SubscriptionService.add(subscription)`` qui permet stocker les infomations d'une inscription (``id,student,course,date``) dans le ``localStorage``. Elle doit aussi vérifier les données des etudiants et cours avec les service correspondants ( ``StudentService`` et ``CourseService``)
- Ajouter une methode de class ``SubscriptionService.getByStudent(student)`` qui permet de récupérer la liste des inscriptions au cours d'un étudiant dans le ``localStorage``
  - Tester la methode en important la class ``SubscriptionService`` dans `server.mjs` et ajouter ce snipet après les imports:
    ```
    SubscriptionService.add(
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
    console.log("Add/get subscription: " + SubscriptionService.getByStudent({number: "1A-1B"}));
    ```
  - Verifier que le log apparaît dans le terminal
- Ajouter une methode de class ``SubscriptionService.getByCourse(course)`` qui permet de récupérer la liste des inscriptions d'un cours dans le ``localStorage``
  - Tester la methode en ajoutant ce snipet dans ``server.mjs``:
    ```
    SubscriptionService.add(
      {
        id: 1,
        student: {
          number: "1A-1B"
        },
        course: {
          code: "UE1"
        },
        date: "27-07-2025"
      }
    );
    console.log("Add/get subscription: " + SubscriptionService.getByStudent({code: "UE1"}));
    ```
  - Verifier que le log apparaît dans le terminal

- Ajouter une methode de class ``SubscriptionService.update(subscription)`` qui permet de mettre à jour les infomations d'une inscription à un cours (``id,student,course,date``) dans le ``localStorage``
  - Tester la methode en ajoutant ce snipet dans ``server.mjs``:
    ```
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
    ```
  - Verifier que le log apparaît dans le terminal
- Ajouter une methode de class ``SubscriptionService.delete([id or code])`` qui permet de supprimer (désinscrire) une inscription à un cours (``id,student,course``) du ``localStorage``
  - Tester la methode en ajoutant ce snipet dans ``server.mjs``:
    ```
    SubscriptionService.add(
      {
        id: 2,
        name: "Computer science",
        code: "UE2",
        credits: 11
      }
    );
    SubscriptionService.add(
      {
        id: 3,
        name: "English",
        code: "UE3",
        credits: 5
      }
    );
    SubscriptionService.delete(2);
    console.log("Delete/get subscription: " + SubscriptionService.get(2));
    SubscriptionService.delete("UE3");
    console.log("Delete/get subscription: " + SubscriptionService.get("UE3"));
    ```
  - Verifier que les deux logs ``undefined`` apparaissent dans le terminal


## III. Micro-service/API de gestion des cours
### 1. API REST de gestion des étudiants
- Créer un endpoint `POST /students` qui utilise le `StudentService` pour ajouter un étudiant dans la liste des étudiants
- Créer un endpoint `GET /students` qui utilise le `StudentService` pour récupérer la liste des étudiants
- Créer un endpoint `GET /students/:id` qui utilise le `StudentService` pour récupérer l'étudiant dont l'id est donné en paramètre
- Créer un endpoint `PUT /students/:id` qui utilise le `StudentService` pour mettre à jours l'étudiant dont l'id est donné en paramètre
- Créer un endpoint `DELETE /students/:id` qui utilise le `StudentService` pour supprimer l'étudiant dont l'id est donné en paramètre

### 1. API REST de gestion des cours
- Créer un endpoint `POST /courses` qui utilise le `CourseService` pour ajouter un cours dans la liste des cours disponibles
- Créer un endpoint `GET /courses` qui utilise le `CourseService` pour récupérer la liste des cours disponibles
- Créer un endpoint `GET /courses/:id` qui utilise le `CourseService` pour récupérer le cours dont l'id est donné en paramètre
- Créer un endpoint `PUT /courses/:id` qui utilise le `CourseService` pour mettre à jous le cours dont l'id est donné en paramètre
- Créer un endpoint `DELETE /courses/:id` qui utilise le `CourseService` pour supprimer le cours dont l'id est donné en paramètre

### 2. API REST de gestion des inscriptions
- Créer un endpoint `POST /subscriptions` qui utilise le `SubscriptionService` pour inscrire un étudiant à un cours dans la liste des cours disponibles
- Créer un endpoint `GET /subscriptions/courses/:courseId` qui utilise le `SubscriptionService` pour récupérer la liste des inscriptions à un cours disponibles
- Créer un endpoint `GET /subscriptions/courses/:courseId/students` qui utilise le `SubscriptionService` pour récupérer la liste des étudiants inscrits à un cours disponibles

- Créer un endpoint `GET /subscriptions/students/:studentId` qui utilise le `SubscriptionService` pour récupérer la liste des inscriptions pour un étudiant dont l'id est donné en paramère

- Créer un endpoint `GET /subscriptions/students/:studentId/courses` qui utilise le `SubscriptionService` pour récupérer la liste des cours disponibles auquels est inscrit un étudiant dont l'id est donné en paramètre

- Créer un endpoint `DELETE /subscriptions/:id` qui utilise le `SubscriptionService` pour déinscrire un étudiant à un cours disponibles

### 3. Utilisation d'une base de données SQL
- Remplacer le stockage des données du `StudentService` par une base de données SQLite
- Remplacer le stockage des données du `CourseService` par une base de données SQLite
- Remplacer le stockage des données du `SubscriptionService` par une base de données SQLite

