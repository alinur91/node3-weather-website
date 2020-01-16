const path = require('path'); /* core modules,no need to install,built in */
const express = require('express') /* npm module */
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname, '../templates/partials' )
/* now we can tell hbs that we're gona put our partials in this partials dierctory */
const app = express() /* express is a function not object */

// Setup handlebars engine and views location
app.set('view engine', 'hbs') /* handlebars koldany ushin nastroika isteimyz */
app.set('views', viewsPath) /*views folderdin atyn ozgerttik na templates poetomy
zhana put korsety kerek app.set('views', viewsPath) dep */
hbs.registerPartials(partialsPath) /*partials configure it */

//Setup static directory to serve
/* serve up static assets */
app.use(express.static(publicDirectoryPath)) /* about.html-goi aboutDirectoryPath degen */
/* public folderdagy bukil html-ge browserden kiryge boladi */
/* browserge localhost:3000/about.html dep kiryge boladi */


app.get('', (req,res)=>{
    res.render('index', {  /* index.hbs koi */
        title: 'weather', name: 'Andrew Hales'
    })
} )

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'about', name: 'Andrew Hales'
    } )
} )

app.get('/help', (req,res)=>{
    res.render('help', {
        help: 'This is a help page,if you have a question,ask',
        name: 'Andrew Hales',
        title: 'help'
    } )
} )
app.get('/weather', (req,res)=>{
    if(!req.query.address) return res.send({error: 'You must provide an address'})

    const address = req.query.address;

    geocode(address,
        (error,{latitude,longitude,location}={})=>{ /* response emes mynda data prinimaem sol datanin latitude,longitude console isteimiz */
       if(error){
           return res.send({error}) /* return bolsa it;s gonna stop the function execution */
       }
       
   /* when thing go well when the search return results we're gonna to get that object
   sent back as the value for data */
   forecast( latitude,longitude, (error, forecastData) => {
   
       if(error) res.send({error}) /* return bolsa it;s gonna stop the function execution */
    
       res.send({
           location, /* kalanyn aty */
           address,
           forecast: forecastData /* prognoz pogody */
       })
       console.log(location) 
       console.log(forecastData) 
       
     })
   
   } )
   
   /* Now we can easily call getocode more than 1 time to get code from different 
   places in our application,We can use as many time as we want */
  
    })

   

app.get('/products', (req,res)=>{
    if(!req.query.search){ /* search obyzatelen query ?search=games */
      return res.send({ /* return stops function execution,code below doesn't execute
      respond single time */
          error: 'You must provide a search term'
      })
    }

    console.log( req.query.search) /* req.query degen object ?search=game */
 
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
       title: '404', message: 'Help article not found',name: 'Andrew Hales'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: '404',message: 'Page not found',name: 'Andrew Hales'
    } )
})
/* Serverdi bastay ushin uistemiz app.listen(i port) */
app.listen(3000, ()=> console.log('Serverimiz 3000 portta istep zhatyr browserde...'))