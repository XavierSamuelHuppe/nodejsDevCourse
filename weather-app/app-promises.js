var yargs = require('yargs')
const axios = require('axios')

const apiKey = "8716b082b4a02e5ece48719829e28758"

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

const URIReadyAddress = encodeURIComponent(argv.address)
const geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${URIReadyAddress}`

var instance = axios.create({
  timeout: 2000
})

instance.get(geocodeUrl).then((response) => {
  if(response.data.status === "ZERO_RESULTS"){
    throw new Error("Unable to find address")
  }

  var lat = response.data.results[0].geometry.location.lat
  var lng = response.data.results[0].geometry.location.lng

  console.log(response.data.results[0].formatted_address)
  var weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`
  return axios.get(weatherUrl)
}).then((response) => {
  var temperature = response.data.currently.temperature
  var feltTemperature = response.data.currently.apparentTemperature
  console.log(`Temperature is ${temperature} but feels ${feltTemperature}`)
}).catch((error) => {
  if(error.code === "ECONNABORTED")
    console.log("Timeout passed")
  else
    console.log(error.message)
})
