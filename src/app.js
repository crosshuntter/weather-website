const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title: "weather app",
        name: 'ahmed'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about me',
        name:'ahmed'
    })
})

app.get('/help',(req,res)=>{
   res.render('help',{ 
       title:'help page',
       msg:'this is the help page',
       name:'ahmed'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must type an address'
        })
    }
    geocode(req.query.address, (error,data) => {
        if (error){
            return res.send({
                error: error
            })
        }
        
        forecast(data.latitude, data.longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            
            res.send({
                location: data.location,
                forecast: forecastData,
                address: req.query.address
            })
        })
        
    })
    
})

app.get('/products',(req,res)=>{
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 page',
        error: 'help article not found',
        name: 'ahmed'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 page',
        error: 'page not found',
        name: 'ahmed'
    })
})

app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})