var request = require('request')

module.exports.geocodeAddress = (address, callback) => {
  const URIReadyAddress = encodeURIComponent(address)
  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${URIReadyAddress}`,
    json: true
  }, (error, response, body) => {
    if(body.status === "ZERO_RESULTS"){
      callback("Unable to find address")
    }
    else if(body.status === "OK"){
      callback(undefined,{
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    } else {
      callback("Unable to connect to Google servers")
    }
  })
}
