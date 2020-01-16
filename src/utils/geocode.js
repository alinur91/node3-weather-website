const request = require('request');/* module name request */

const geocode = (address,callback) =>{

    // if(!address) return console.log('Provide an address')
/*process.argv[2] esli ne predostavit if true boladi i console shigaradi,esli predostavid
node app.js almaty dep to if() ishi false bop ketedi i vse shigip ketedi iftan i dalshe prodolzhit */

    const url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWxlYXNoZXJubiIsImEiOiJjazU2dDF1eW4wMmR2M2VwOGVyc3hld2NlIn0.K6trBOS5SHzSbX7Dm4hoGA&limit=1`
    request( {url, json:true}, (e,{body})=>{ /* url degen reserved keyword, url2 bolmaidi nado url */
        if(e){
            callback('Unable to connect to location services!',undefined)
        } else if(body.features.length === 0){
/* we didn't get any search results */
            callback('Unable to find location.Try another search',undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
        
    } )
}


module.exports = geocode