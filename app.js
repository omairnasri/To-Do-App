var express = require('express');
var app = express();

// Require the controller that handles get/post requests. Controller is middle man between updating data and loading pages.
var todoController = require('./controllers/todoController.js');

// Set up template engine
app.set('view engine', 'ejs');

// Implementing static files
app.use(express.static('./public'));

// Fire controllers
todoController(app);

// Listent to port
app.listen(3000);

console.log('Navigate to http://localhost:3000/todo for a demo :)');