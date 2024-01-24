console.log('welcome to Node..');

const fs = require('fs'); // file System pagage
const os = require('os'); // Operaating System Pagage 

/* call related File */
const notes = require('./notes.js')


var resES6 = notes.addNoteES6();
console.log(resES6);

var resES5 = notes.addNoteES5Adding(9,-2);
console.log(resES5);
/*
File System is used for get create ,  update delete process
Operating System is a detail for runing system
*/

var user = os.userInfo();
console.log(user.username);
fs.appendFileSync('message.txt',`hello ${user.username} , You are ${notes.age} Years Old`);