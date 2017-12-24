var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(typeof a === 'number' && typeof b === 'number'){
        resolve(a+b)
      } else {
        reject('Arguments must be numbers')
      }
    }, 500)
  })
}

// asyncAdd(6,5).then((result) => {
//   return asyncAdd(result, 33)
// }, (message) => {
//   console.log(message)
// }).then((result) => {
//   console.log(result)
// }, (message) => {
//   console.log(message)
// })

asyncAdd(8,5).then((result) => {
  return asyncAdd(result, 33)
}).then((result) => {
  console.log(result)
}).catch(() => {
  console.log("Something in the chain went wrong")
})

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Hey, it worked!')
//     // reject('Unable to fulfill promise')
//   }, 2000)
// })
//
// somePromise.then((message) => {
//   console.log('Success: ',message)
// }, (errorMessage) => {
//   console.log('Error: ',errorMessage)
// })
