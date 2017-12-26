const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// var id = "5a40d98c09612d1706a75c37"
//
// if (!ObjectID.isValid(id)) {
//   console.log("ID not valid")
// }

// Todo.find({
//   _id : id
// }).then((todos) => {
//   console.log("Todos", todos)
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log("Todo", todo)
// })
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log("Id not found")
//   }
//   console.log("Todo by Id", todo)
// }).catch((e) => {
//   console.log(e)
// }) 

// var newUser = new User({
//   email: "abc"
// })
// newUser.save()

User.findById('5a41e13faecd7a2edbeab749').then((user) => {
  if (!user) {
    return console.log("Id not found")
  }
  console.log("User by Id", user)
}).catch((e) => {
  console.log(e)
})
