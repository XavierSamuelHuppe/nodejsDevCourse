console.log('Starting app');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');

// var user = os.userInfo();
// fs.appendFile('myFile.txt', `I put this in for you, ${user.username} :)\nYou are ${notes.age}.\n`,
// function (err) {
//   if(err) console.log("Can't append to file.");
//   console.log('Appended file successfully!');
// });

// var res = notes.addNotes();

// console.log(notes.add(5,4));

console.log(_.isString(true));
console.log(_.isString("Xavier"));

console.log(_.uniq([1,1,2,2,3,4]));
