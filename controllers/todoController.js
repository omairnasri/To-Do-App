var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://test:test123@ds121674.mlab.com:21674/omairdb');

// Create schema - blueprint
var todoSchema = new mongoose.Schema
({
	item: String
});

// Collection/Module
var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'Get flowers'}).save(function(error)
// {
// 	if(error)
// 		throw error;
// 	console.log('Items saved.');
// });

module.exports = function(app)
{	
	app.get('/todo', function(req, res)
		// Get data from mongodb and pass it to the view.
	{
		Todo.find({}, function(error, data)
		{
			if(error)
				throw error;

			res.render('todo', {todos: data});

		});
		
	});

	app.post('/todo', urlEncodedParser, function(req, res)	// the request object(req) holds the value from 'data' passed in from the ajax request. 
	{  
		// Get data from the view and add it to mongodb
		var addItem = Todo(req.body).save(function(error, data)
		{
			if(error)
				throw error;

			res.json(data);
		});
	
	});

	app.delete('/todo/:item', function(req, res)			// Find and delete item from array
	{		
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(error, data)
		{
			if(error)
				throw error;

			res.json(data);
		});
	
	});


}