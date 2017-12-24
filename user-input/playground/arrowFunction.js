 var square = x => x * x
// console.log(square(9))

var user = {
  name : "Xavier",
  sayHi: () => {
    console.log(arguments) //Does not work
    console.log(`Hi. I'm ${this.name}`)
  },
  sayHiAlt () {
    console.log(arguments) //Does work!
    console.log(`Hi. I'm ${this.name}`)
  }
}
user.sayHi()
user.sayHiAlt()
