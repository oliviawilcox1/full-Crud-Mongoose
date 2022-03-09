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
            console.log(fruits)
            res.render('fruits/index.liquid', { fruits })
        })
    // show an error if there is one
        .catch(error => {
            console.log(error)
            res.json({error})
        })

})



/////////////////////////////////////
// Server Listener //
/////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`app is listentning on port: ${PORT}`)
})