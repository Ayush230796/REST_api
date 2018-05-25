var express= require('express');
var Ninja= require('../modules/ninjas');
var bodyParser = require('body-parser');
var urlencodedParser= bodyParser.urlencoded({ extended: false });
var router = express.Router();

//get the list of ninjas
router.get('/ninjas', function(req,res,next){
  /*Ninja.find({}).then(function(ninjas){
  res.send({ninja});
});*/
Ninja.aggregate().near({
 near: {
  'type': 'Point',
  'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
 },
 maxDistance: 100000,
 spherical: true,
 distanceField: "dis"
})﻿.then(function(ninjas){
    res.send(ninjas);
  });
});

//add a new ninja to the db
router.post('/ninjas', urlencodedParser, function(req,res,next){
  var ninja = Ninja(req.body).save(function(err,data){
 if (err) throw res.status(422).send(err.message);
   res.send({ninja});
})
  });


//update a ninja in the db
router.put('/ninjas/:id', function(req,res,next){
  Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Ninja.findOne({_id: req.params.id}, req.body).then(function(ninja){
     res.send(ninja);
   });
  });
});

//delete a ninja from the db
router.delete('/ninjas/:id', function(req,res,next){
  Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
    res.send(ninja);
  });
});

module.exports= router;
