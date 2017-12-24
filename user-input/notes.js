const fs = require('fs');
const _ = require('lodash');

const DATABASENAME = "notes.json";

var addNote = (title,body) => {
  var notes = findAll();
  var note = {
    title,
    body
  };
  addToNotesIfNotDuplicate(notes, note, title);
}

var addToNotesIfNotDuplicate = (notes, note, title) => {
  var duplicateNotes = notes.filter((note) => note.title === title);

  if(duplicateNotes.length === 0){
    notes.push(note);
    updateNotes(notes);
    console.log("Added note");
  }else{
    console.log("Duplicate, not adding");
  }
}

var getAll = () => {
  console.log("Getting all notes");
  var notes = findAll();
  var titles = extractTitles(notes);
  titles.forEach(title => console.log(title));
}

var readNote = (title) => {
  console.log("Reading note");
  var notes = findAll();
  var titles = extractTitles(notes);
  if(titles.includes(title)){
    console.log(notes[_.findIndex(notes, note => note.title === title)].body);
  }else{
    console.log("No note with this title");
  }
}

var extractTitles = (notes) => {
  var titles = _.flatMap(notes, note => note.title);
  return titles;
}

var removeNote = (title) => {
  console.log("Removing note");
  var notes = findAll();
  var alteredNotes = notes.filter(note => note.title !== title);
  updateNotes(alteredNotes);
}

var findAll = () => {
  try {
    fs.readFileSync(DATABASENAME);
  }catch(e){
    console.log("Creating initial file.");
    fs.appendFileSync(DATABASENAME ,"[]");
  }finally{
    var notes = fs.readFileSync(DATABASENAME);
    return JSON.parse(notes);
  }
}

var updateNotes = (notes) => {
  fs.writeFileSync(DATABASENAME, JSON.stringify(notes));
}

module.exports = {
  addNote,
  getAll,
  readNote,
  removeNote
}
