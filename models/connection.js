/////////////////////////////////////
// Import Dependencies //
/////////////////////////////////////


require('dotenv').config()
const mongoose = require('mongoose')


/////////////////////////////////////
// DataBase Connection //
/////////////////////////////////////

// here we are setting up inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DATABASE_URL, CONFIG)


//events for when our connection opens closes or errors
mongoose.connection
	.on('open', () => console.log('Connected to Mongoose'))
	.on('close', () => console.log('Disconnected from Mongoose'))
	.on('error', (error) => console.log(error))

/////////////////////////////////////
// Export our connection //
/////////////////////////////////////  
module.exports = mongoose