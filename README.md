# Express
Ce projet est une serie d'exercices pour apprendre et se familiariser avec Express. La documentation d'Express ce trouve à cette addresse: https://expressjs.com/
- Elle traite l'inscription d'étudiants à des cours dispensés à l'école tel celui sur Node.js

## I. Initialisation du projet
### 1 - Ajouter NPM au projet 
- Executer la commande ``npm init`` :
```
package name: nodejs-express-courses 
version: (1.0.0) 
description: A Node.js Express course API
entry point: server.js
test command: 
git repository: 
keywords: Node.js, Express,Scolar
author: Toolu Xarala
license: (ISC) Apache-2.0

```
- Vérifier que le fichier ``package.json`` est créé avec les bonnes valeurs
```
{
  "name": "odejs-express-courses",
  "version": "1.0.0",
  "description": "A Node.js Express course API",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
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
- Créer le fichier ``entry point`` ``server.js`` et ajouter le log ``console.log("Hello Express !")``
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
      "start": "nodemon server.js"
  }
```
- lancer le programme avec ``npm start`` 
- Ajouter le log ``console.log("New log before start !")`` au début du fichier ``server.js`` et enregistrer.
- Vérifier que le programme redémare automatiquement dans le terminal. Le nouveau log doit apparaître dans le terminal.

### 3 - Ajouter la librairie monment.js pour calculer le temps de démarrage du server
- Documentation: https://momentjs.com/docs/
- Executer la commande ``npm install moment``
- Vérifier que la dépendance ``moment`` est bien créée dans le fichier ``package.json``:
```
  "dependencies": {
    "moment": "^2.30.1"
  }

```
- Ajouter ce code snippet au début du fichier ``server.js``:

```
const moment = require('moment')

let start = moment.now();

```
- Ajouter ce code snippet à la fin du fichier ``server.js``:

```
  let startupTimeMilis = end - start
  console.log("Started server in " + (startupTimeMilis / 1000) + "s")

```
- Enregistrer le fichier. Vérifier que le log de démarrage ``"Started server in ...s"`` apparaît dans le terminal.
### 4 - Ajouter la librairie Local-storage pour stocker les informations dans le disk
- Documentation: https://www.npmjs.com/package/node-localstorage
- Executer la commande ``npm i node-localstorage``
- Vérifier que la dépendance ``node-localstorage`` est bien créée dans le fichier ``package.json``
- Ajouter ce code snippet au début du fichier ``server.js``:

```
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./student-course.db')
}

localStorage.setItem('name', 'Toolu Xarala')
console.log("Name: " + localStorage.getItem('name'))

```
- Enregistrer le fichier. Vérifier que le log de démarrage ``"Name: Toolu Xarala"`` apparaît dans le terminal.
## II. Logique métier
### 1 - Créer le service de gestion des étudiants
- Créer un dossier ``services`` à la racine du projet
- Créer le fichier ``student-service.js`` dans le dossier services et ajouter la class ``StudentService``
- Ajouter une methode de class ``StudentService.add(student)`` qui permet stocker les infomations (``id,name,number``) dans
## III. Micro-service/API de gestion des cours

