const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5a4097f1fbe292b3322fa9e5')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result)
  // })
  db.collection('Users').findOneAndUpdate({
    name: "Boris"
  }, {
    $set: {
      name: "Xavier"
    },
    $inc: {
      age:1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result)
  })

  db.close()
})
