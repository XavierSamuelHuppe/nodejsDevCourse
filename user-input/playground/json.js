// var obj = {
//   name : "Xavier"
// }
// console.log(typeof obj);
// console.log(obj);
//
// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);

// var personString = '{"name": "Xavier", "age":"24"}';
// console.log(personString);
//
// var person = JSON.parse(personString);
// console.log(person);

const fs = require('fs');
var originalNote = {
  title:"a title",
  body:"a body"
}
var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync("notes.json", originalNoteString);

var notes = fs.readFileSync("notes.json");
console.log(typeof notes);
console.log(JSON.parse(notes));
