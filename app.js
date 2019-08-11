// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var express = require('express')
var path = require('path')

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================
// Tells node that we are creating an "express" server
var app = express()
// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  !!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!  VERY IMPORTANT NOTE BELOW, THIS CHANGED THE GAME!!  !!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!  BODYPARSING THE DATA IS WHAT HELD UP FROM ADDING TO THE ARRAY, !!
// !!!!!!!!!!!!!!!!!!!  var bodyParser = require('body-parser')
// !!!!!!!!!!!!!!!!!!!  https://stackoverflow.com/questions/18649881/handling-input-arrays-in-express-forms
// !!!!!!!!!!!!!!!!!!!  app.use(bodyParser.urlencoded({ extended: true }));
// !!!!!!!!!!!!!!!!!!!  NOTE: GOT RID OF LINES OF CODE ABOVE & replaced it with, .then(res => res.json()) in survey.html after fetch, in line 313
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
//                             (IIFE)
require('./app/routing/apiRoutes')(app)
require('./app/routing/htmlRoutes')(app)
// =============================================================================
// // TEST GET method route
// app.get('/', function (req, res) {
//     res.send('Testing the connection player!!')
//   })
// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================
app.listen(PORT, function () {
  console.log(`App listening on PORT ${PORT}`)
})
