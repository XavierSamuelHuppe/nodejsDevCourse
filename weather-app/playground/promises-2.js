const request = require('request')

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    const URIReadyAddress = encodeURIComponent(address)
    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${URIReadyAddress}`,
        json: true
      }, (error, response, body) => {
        if(body.status === "OK"){
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          })
        } else if(body.status === "ZERO_RESULTS"){
          reject("Unable to find address")
        } else {
          reject("Unable to connect to Google servers")
        }
    })
  })
}

geocodeAddress('G6H 2N7').then((result) => {
  console.log(JSON.stringify(result, undefined, 2))
}).catch((error) => {
  console.log(error);
})
