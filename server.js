/////////////////////////////////
// Import dependencies
///////////////////

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const Fruit = require('./models/fruit')

/////////////////////////////////////
// Creat Express Application Object//
/////////////////////////////////////
const app = require('liquid-express-views')(express())

/////////////////////////////////////
// MiddleWare //
/////////////////////////////////////
app.use(morgan('tiny'))
//this is for request logging^
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}))
//parses url encoded request bodies^
//to serve files from public statically
app.use(express.static('public'))

/////////////////////////////////////
// Routes //
/////////////////////////////////////

app.get('/', (req,res)=> {
    res.send('your server is running')
    console.log(Fruit)
})


app.get('/fruits/seed', (req,res)=> {
     const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
      ]

      //when we seed data
      // first delete data that already exists
      Fruit.remove({})
            .then(data => {
                console.log('this s what remove returns', data)
                //then we create with our seed data 
                Fruit.create(startFruits)
                //create functions as insertmany or insertone
                    .then(data=> {
                        console.log('thisn os what create returns', data)
                        res.send(data)
                    })
            })

      // then we can send if we want to see that data 
})
//index
app.get('/fruits', (req,res)=>{
    //find the fruits
    Fruit.find({})
    // then render a template after theyre found
        .then(fruits => {
            //coulduse data instead of fruits
            //console.log(fruits)
            //then console.log(data)
            res.render('fruits/index', { fruits })
            // then {fruits: data}
            //fruits is equal to {fruits: fruits}
        })
    // show an error if there is one
        .catch(error => {
            console.log(error)
            res.json({error})
        })

})

//new route 
app.get('/fruits/new', (req,res)=> {
    res.render('fruits/new')
})

//create route
app.post('/fruits', (req,res)=>{
    //check if readyToEat should be true or false
    // we can check in one line
    //first sets the property named
    req.body.readyToEat = req.body.readyToEat === 'on'? true: false

    console.log('this is the fruit to create', req.body)
    //readyf or mongoos
    Fruit.create(req.body)
        .then(fruit => {
            //console.log('this is what was created', data)
            res.redirect('/fruits')
        })
        .catch(err => {
            console.log(err)
                res.json({ err })
            })

       
})
//edit route
app.get('/fruits/:id/edit', (req,res)=> {
    //we need to get the id
    const fruitId = req.params.id
    //find the fruit
    Fruit.findById(fruitId)
    //-> render if there is a fruit 
        .then(fruit => {
            res.render('fruits/edit', {fruit})
        })
    //-> error if no fruit 
        .catch(err =>{
            console.log(err)
            res.json({err})
        })
})

//update route
app.put('/fruits/:id', (req,res) => {
    //get the id
    const fruitId = req.params.id
    //check and assign the readyToEat property with correct value
    req.body.readyToEat = req.body.readyToEat === 'on'? true: false
    //mongoose to update
    Fruit.findByIdAndUpdate(fruitId, req.body, { new: true })
    //if succesful nredirect to fruit page 
        .then(fruit => {
            console.log('the updated fruits', fruit)
            res.redirect(`/fruits/${fruit.id}`)
        })
    // if error display
        .catch(error => res.json(error))
})
//show route
app.get('/fruits/:id', (req,res)=> {
    //first we need to get id
    const fruitId = req.params.id
    //then we can find a fruit by its id
    Fruit.findById(fruitId)
    //once found we can render a view
        .then(fruit => {
            res.render('fruits/show', {fruit} )
        })
    //if theres an error, show 
        .catch(err => {
            console.log(err)
            res.json({ err })
        })

})


app.delete('/fruits/:id', (req,res)=>{
    const fruitId = req.params.id
    Fruit.findByIdAndRemove(fruitId)
        .then(fruit => {
            console.log('this is the response from FBID', fruit)
            res.redirect('/fruits')
        })
        .catch(err => {
            console.log(err)
            res.json({ err })
        })
})








/////////////////////////////////////
// Server Listener //
/////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`app is listentning on port: ${PORT}`)
})