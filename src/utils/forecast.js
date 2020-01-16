const request = require('request');


const forecast = (longitude,latitude,callback) =>{
    // console.log(latitude,longitude)
    const url = `https://api.darksky.net/forecast/22ae62dfe2ea3d8f98e8eeb846a6b406/${latitude},${longitude}?units=si`;
//'https://api.darksky.net/forecast/22ae62dfe2ea3d8f98e8eeb846a6b406/37.8267,-122.4233?lang=ru&units=si';
    /* request is a function */
    request({url,json: true},
    (e,{body})=>{ 
        if(e){ /* fail at a low level os internet bolmasa */
            
            callback('Unable to connect to weather service',undefined)
        }else if(body.e){ /* if things go wrong with the input we'll get another message, mysali longitude udalitetsen */
            
            callback('Unable to find location',undefined)
        }
        
        else{ /* if everything goes right forecast will show up */

            callback(undefined, 
`${body.daily.data[0].summary}. It's currently ${body.currently.temperature}  degrees out. There is a ${body.currently.precipProbability}% chance of rain `
                )
        }
        
        
    })
    
}


module.exports = forecast;