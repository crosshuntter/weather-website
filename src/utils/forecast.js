const request = require('request')

const forecast = (latitude,longtitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/d4ae03d9af2dfe87c23b8735db2b59eb/'+encodeURIComponent(latitude)+','+encodeURIComponent(longtitude)+'?units=si'
    request({url: url, json: true}, (error,response)=>{
        if(error){
            callback('unable to connect to weather service')
        } else if(response.body.error) {
            callback('unable to find location')
        } else {
            const temp = response.body.currently.temperature
            const precipPROB = response.body.currently.precipProbability
            callback(undefined,"it is currently " + temp + " degrees out. there is a " + precipPROB + "% chance of rain")
        }
    })

}


module.exports= forecast