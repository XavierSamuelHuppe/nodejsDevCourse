var getUser = (id, callback) => {
  var user = {
    id : 31,
    name : "Xavier"
  }
  setTimeout(() => callback(user), 1000)
}

getUser(31, (user) => {
  console.log(user)
})
