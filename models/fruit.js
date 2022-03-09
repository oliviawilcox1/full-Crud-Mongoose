/////////////////////////////////////
// Import Dependencies //
/////////////////////////////////////

const mongoose = require('./connection')


/////////////////////////////////////
// Define Fruits Model //
/////////////////////////////////////

//pull the schema and model constructors
//we're going to use something called destructuring to accomplish this
const { Schema, model} = mongoose
//this syntax is called destructuring 
// can look at any object and find anything that matches schema or model
// and saves it to a variable immediately 

//make our fruits Schema
const fruitSchema = new Schema ({
    name: {type: String },
    color: {type: String},
    readyToEat: {type: Boolean}
}, {timestamps: true})

//fruti model
const Fruit = model('Fruit', fruitSchema)

/////////////////////////////////////
// Export Model //
/////////////////////////////////////

module.exports = Fruit