console.log("Hello Express !")
console.log("New log before start !")

const moment = require('moment')

let start = moment.now();
let end = moment.now()
let startupTimeMilis = end - start
console.log("Started server in " + (startupTimeMilis / 1000) + "s")
