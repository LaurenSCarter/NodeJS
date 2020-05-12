const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/f3c4593cc6c9281ee206a8862edc1e28/'+latitude+',' +longitude+ '?units=auto'

    request( { url, json: true} , (error, {body} ) => {
        
        //low level OS error
        if(error){
            callback('unable to connect to the weather service', undefined)
        } 
        
        //error with API usage - passing on the error message provided from the API
        else if (body.error) {
            callback(body.error, undefined)
        }
        //good conditions
        else {

            units = body.flags.units
            if(units==="us" ? units = "fahrenheit": units = "celcius")

            callback(undefined,
                    
                'Howdy, today\'s weather will be between '+ body.daily.data[0].temperatureMin + " and " +
                body.daily.data[0].temperatureMax + " " + units + ".\n"
                
                +'Currently it is ' + body.currently.summary+ 
                ' with a temperature of ' + body.currently.temperature+ ' ' + units +  "."

                + '\nThere is a ' + (body.daily.data[0].precipProbability * 100) +
                '% chance of ' + body.daily.data[0].precipType + "."
                )
                
        }
    })
}
module.exports = forecast