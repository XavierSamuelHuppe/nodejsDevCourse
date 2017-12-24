console.log("starting user input exercise\n");

var fs = require("fs");
var _ = require("lodash");
var argv = require("yargs").argv;

var notes = require("./notes.js");


var command = argv._[0];

switch(command) {
  case "add":
    notes.addNote(argv.title, argv.body);
    break;
  case "list":
    notes.getAll();
    break;
  case "read":
    notes.readNote(argv.title);
    break;
  case "remove":
    notes.removeNote(argv.title);
    break;
  default :
    console.log("invalid command");
    break;
}
