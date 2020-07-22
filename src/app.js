const path = require('path');
const express = require('express');
const hbs = require('hbs');
// console.log(__dirname) // directory __dirname , __filename
// console.log(path.join(__dirname, '../public')) 
// path join to direct to the public file index.html


const app = express();
const port = process.env.PORT || 3000; //process is from Heroku and for local is logical or at 3000

const viewsPath = path.join(__dirname,'../templates/views') // in case we decided to put the hbs files in the templates folder
// app.set('views' , viewsPath) // setting up the viwes dir = viewsPath above

const partialPath = path.join(__dirname, '../templates/partials')

// setting up hbs for the handlebars usage (template)
app.set('view engine','hbs')  
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

const publicDirectoryPath = path.join(__dirname, '../public');
// setting up atstic directory
app.use(express.static(publicDirectoryPath))

//setting up a dynamic index.html and instead of send we are using render
// deleted the static html from the public and moved to the index.hbs as for dynamic
// no extension for index.hbs is needed and it will be rendered by the virtue of HBS library
app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Aninda Halder'
    })
})

// As for about the path must be mentioned as it is not index
app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About King',
        name: 'Aninda'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help',
        helpText: 'Still maintained',
        name: 'Aninda'
    })
})

// path join to direct to the public file index.html
// app.com
//app.com/help
//app.com/about
// think about an usual website with sub directories
//  a get method for the website
// req as required and res as response
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })
//  //removing help as we linked the, to html 
// localhost:3000/help
// app.get('/help', (req,res) => {
//     res.send([{
//         name: 'Aninda'
//     },{
//         name: 'King'
//     }])
// })

// app.get('/about', (req,res) =>{
//     // we can send objects via res.send
//     res.send('<h1>About</h1>')
// })

const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
app.get('/weather', (req, res) => {
   if(!req.query.address){
       return res.send({
           error: 'Must input an address'
       })
   }

   geocode(req.query.address,(error, {latitude, longitude, location}={}) => {
    if(error){
        return res.send({error})
    }
     forecast(longitude, latitude, (error, forecastData) => {
         if(error){
             return res.send({error});
         }
         console.log(location)
         console.log(forecastData)
         res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address
        })
     })
     
 })
   console.log(req.query.address)
 
    
})



app.get('/products', (req,res) => {
    if(!req.query.search){
      return res.send({
            error: 'Must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*' ,(req,res)=>{
    res.render('404', {
        title: '404 help',
        name: 'Aninda',
        errorMessage: 'Help article not found'
    })
})

// for everything else being typed in the localhost that isn't available to get
// the express provides the '*' that check everything and if not found runs this
app.get('*',(req,res) =>{
    res.render('404', {
        title: '404',
        name: 'Aninda',
        errorMessage: 'Page not Found'
    })
})

// Now start up the server by listen() at aspecific port {localhost:3000} 
app.listen(port, () => {
    console.log('Server is up on port' + port) 
    // wont run on the website
    // just loging on terminal as an information output to make life easier    
})