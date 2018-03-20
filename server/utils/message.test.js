const expect = require('expect')

const { generateMessage, generateLocationMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Max'
    const text = 'Some message'
    const message = generateMessage(from, text)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({
      from,
      text,
    })
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Alena'
    const latitude = 25;
    const longitude = 20;
    const url = 'https://www.google.com/maps?q=25,20'
    const message = generateLocationMessage(from, latitude, longitude)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({
      from,
      url,
    })
  })
})

