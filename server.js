/////////////////////////////////
// Import dependencies
///////////////////

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')


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
})








/////////////////////////////////////
// Server Listener //
/////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`app is listentning on port: ${PORT}`)
})