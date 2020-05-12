/**
 * Now has intergration with the backend to 
 * obtain the weather for an address.
 */

const path = require('path')
const express  = require('express')
const hbs = require ('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require ('./utils/forecast.js')

const app = express()

//sets the port, env.PORT if runnong on Heroku
//or 3000 is running locally
const port = process.env.PORT || 3000


//define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))


//using a hbs/ file for index page
app.get('', (req,res) => {
    res.render('index', {
        title: "Weather App",
        name: 'Lauren Carter'
    })
})

//now for about page
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About the author',
        name: 'Lauren Carter'
    })
})

//now for help page
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'To use this site, simply enter a location on the Weather page and click search.  The site will verify this location and return the current weather. If necessary, refine your search by including a state/region/country.',
        name: 'Lauren Carter'
    })
})


//setup a different sub page (/weather)
//note, this will need to run with a query string
//in the address.  The query string needs to contain
//a location/address
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide a location for the weather'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
                
            } else {
                return res.send({
                    location,
                    forecast: forecastData
                })
            }
        })
    })
})

app.get('/products', (req, res) => {
    
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        products: []
    })
})

//setup a specific 404 page, for example, anyone
//already in the help area
app.get('/help/*', (req, res) => {
    res.render('404-error', {
        title: 'Help',
        error: 'Help article not found',
        name: 'Lauren'
    })

})

//setup a generic 404 page - set this up last, 
//heirarchy is important, let all other
//get pages be evaulated first so that 
//this will apply to anything else
app.get('*', (req, res) => {
    res.render('404-error', {
        title: ':(',
        error: 'page not found',
        name: 'Lauren'
    })
})


/**
 * listener
 */
app.listen(port, () => {
    console.log('Server has started up on port: ' + port)
})
