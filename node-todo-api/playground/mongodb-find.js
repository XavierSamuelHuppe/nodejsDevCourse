const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

  db.collection('Todos').find({_id: new ObjectID('5a4097f1fbe292b3322fa9e5')}).toArray().then((docs) => {
    console.log('Todos')
    console.log(JSON.stringify(docs, undefined, 2))
  }, (err) => {
    console.log('Unable to fetch todos')
  })

  db.close()
})
