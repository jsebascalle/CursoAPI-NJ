var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var Schema = mongoose.Schema

let placeSchema = new Schema({
  title: {type:String,required:"El nombre es obligatorio"},
  description: String,
  acceptsCreditCard:{
    type:Boolean,
    default:false
  },
  coverImage:String,
  avatarImage:String,
  openHour:Number,
  closeHour:Number
});

placeSchema.plugin(mongoosePaginate);

let Place = mongoose.model("Place",placeSchema);

module.exports.Place = Place;
