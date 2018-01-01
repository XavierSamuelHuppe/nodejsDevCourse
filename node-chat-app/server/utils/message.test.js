const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate message correct message object', () => {
    var from = "Xavier"
    var text = "allo"

    var message = generateMessage(from, text)
    expect(message).toBeDefined()
    expect(message.from).toBe(from)
    expect(message.text).toBe(text)
    expect(message.createdAt).toBeDefined()
    expect(message.createdAt).toBeTruthy()
    expect(typeof message.createdAt).toBe('number')
  })
})
