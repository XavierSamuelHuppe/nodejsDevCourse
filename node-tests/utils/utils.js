module.exports.add = (a, b) => a + b

module.exports.asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(a+b)}
    , 1000)
}

module.exports.square = (a) => a*a
module.exports.setName = (user, fullname) => {
  var [firstname, lastname] = fullname.split(" ")
  user.firstname = firstname
  user.lastname = lastname
  return user
}
