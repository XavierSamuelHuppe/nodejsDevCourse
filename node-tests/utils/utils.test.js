const expect = require('expect')

const utils = require('./utils')

describe('Utils', () => {
  describe('add', () => {
    it('should add two numbers', () => {
      var a = 33
      var b = 11
      var expectedAnswer = a+b
      var res = utils.add(a, b)

      if(res !== expectedAnswer)
        throw new Error(`Was expecting ${expectedAnswer} but got ${res}`)
    })
    //with expect
    it('should add two numbers with expect', () => {
      var a = 33
      var b = 11
      var expectedAnswer = a+b
      var res = utils.add(a, b)

      expect(res).toBe(expectedAnswer).toBeA('number')
    })
  })
  describe('square', () => {
    it('should square a numbers', () => {
      var a = 3
      var expectedAnswer = a*a
      var res = utils.square(a)

      if(res !== expectedAnswer)
        throw new Error(`Was expecting ${expectedAnswer} but got ${res}`)
    })
  })
})

it('should return user with firstname', () => {
  var res = utils.setName({}, "Xavier Huppé")
  expect(res).toInclude({firstname:"Xavier"})
})

it('should return user with lastName', () => {
  var res = utils.setName({}, "Xavier Huppé")
  expect(res).toInclude({lastname:"Huppé"})
})

it('should return user with firstname and lastName', () => {
  var res = utils.setName({}, "Xavier Huppé")
  expect(res).toInclude({firstname:"Xavier",lastname:"Huppé"})
})

it('should Equal assert', () => {
  var res = utils.setName({}, "Xavier Huppé")
  expect(res).toEqual({firstname:"Xavier",lastname:"Huppé"})
})

it('multiple tests', () => {
  expect({name:"Xavier"}).toEqual({name:"Xavier"})
  expect([1,2,3]).toInclude(2)
  expect({name: "Xavier", age: "24"}).toInclude({age: 24})
})

it('asyncAdd should add two numbers', (done) => {
  utils.asyncAdd(4,3, (sum) => {
    expect(sum).toBeA('number').toBe(7)
    done()
  })
})
