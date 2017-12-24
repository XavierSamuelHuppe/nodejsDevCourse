var request = require('request')

const apiKey = "8716b082b4a02e5ece48719829e28758"

module.exports.weatherAt = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error || response.statusCode === 200){
      callback(undefined,{
        currently: body.currently,
        description: body.minutely.summary
      })
    } else {
      callback("Bad params")
    }
  })
}
