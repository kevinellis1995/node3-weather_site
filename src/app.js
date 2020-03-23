const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for Express config
const publicIndex = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and templates location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup Static Directory to Serve
app.use(express.static(publicIndex));

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Kevin Ellis'
    })
});

app.get('/about', (req,res)=>{
    res.render('about', {
        name: 'Joe Shmo',
        title: 'About Me'
    })
});

app.get('/help', (req,res)=>{
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Kevin Ellis'
        }
    )
});

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'Please provide an address'
            }
        )
    }

    geocode(req.query.address, (err, {location, latitude, longitude}={})=>{

        if(err){
            return res.send({error:err})
        }
        forecast(latitude, longitude, (error, {title, temp, precip}) => {

            if(error){
                return res.send({error})
            }
            res.send(  {
                location,
                title,
                temp,
                precip
            })
        })
    })

});

app.get('/products', (req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
});

app.get("/help/*", (req,res)=>{
    res.render('404',{
        message: 'Help article not found!',
        title: '404 Error',
        name: 'your mom'
    })
});

app.get('*',(req,res)=>{
    res.render('404',{
        message: 'Page Not Found :(',
        title: '404 Error',
        name: 'faggitty'
    })
});

app.listen(3000, () => {
    console.log('Server running on port 3000')
});