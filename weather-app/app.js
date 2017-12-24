var yargs = require('yargs')

var geocode = require('./geocode/geocode.js')
var weather = require('./weather/darkSky.js')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if(errorMessage) console.log(errorMessage)
  else {
    weather.weatherAt(
      results.latitude,
      results.longitude,
      (errorMessage, forecast) => {
        if(errorMessage){
          console.log(errorMessage)
        }else{
          console.log(forecast.description)
        }
      }
    )
  }
})
