var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var Uploader = require("./Uploader");
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

placeSchema.methods.updateImage = function(path,imageType){
   return Uploader(path).then(secure_url=>this.saveImageUrl(secure_url,imageType));
};

placeSchema.methods.saveImageUrl = function(secure_url,imageType){

  if (imageType == 'avatarImage') {
      this.avatarImage = secure_url;
  }

  return this.save();
};

placeSchema.plugin(mongoosePaginate);

let Place = mongoose.model("Place",placeSchema);

module.exports.Place = Place;
