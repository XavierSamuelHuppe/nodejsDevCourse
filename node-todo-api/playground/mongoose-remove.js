const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

var id = new ObjectID()
console.log(id)

var newTodo = new Todo({
  _id: id,
  text: "This is text"
})
newTodo.save().then((todo) => {
  console.log("\n---After save---\n", todo)
  return Todo.find()
}).then(todos => {
  console.log("\n---After find---\n", todos)
  return Todo.count()
}).then(res => {
  console.log("\n---After count---\n", res)
  return Todo.findByIdAndRemove(id)
}).then(res => {
  console.log("\n---After remove---\n", res)
  return Todo.count()
}).then(res => {
  console.log("\n---After count---\n", res)
}).catch(e => {
  console.log("\n---error---\n",e)
})

//
// Todo.count().then(res => console.log(res))
//
// Todo.findByIdAndRemove(id).then((todo) => {
//   console.log("res",todo)
// },(e) => {
//   console.log("e",e)
// })
