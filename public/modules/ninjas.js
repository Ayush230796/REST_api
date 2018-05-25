var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// connect to mongodb
mongoose.connect('mongodb://test:test@ds233970.mlab.com:33970/ninjas');

//create geolcation Schema
var GeoSchema = new Schema({

    type: {
      type: String,
      default: "Point"

    },

    coordinates:{
      type: [Number],
      index: "2dsphere"
    }

});

// create ninja Schema and model
var NinjaSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Name field is required']
  },
  rank:{
    type: String
  },
  available:{
    type:Boolean,
    default: false
  },
    //add in geo location
  geometry: GeoSchema

});

var Ninja= mongoose.model('Ninja', NinjaSchema);
module.exports= Ninja;
