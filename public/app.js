var express = require ('express');
var bodyParser = require ('body-parser');
var mongoose= require ('mongoose');
var routes = require('./routes/api');

//set up express app;
var app = express();


//using middleware
app.use('/assets', express.static('assets'));

app.use(bodyParser.json());

//initialize routes
app.use('/api', routes);


//listen to port
app.listen(process.env.port || 4000, function(){
  console.log('now listening for requests');
});
