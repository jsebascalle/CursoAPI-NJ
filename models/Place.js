const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Uploader = require("./Uploader");
const Schema = mongoose.Schema
const slugify = require("../plugins/slugify");

let placeSchema = new Schema({
  title: {type:String,required:"El nombre es obligatorio"},
  slug: {
    type: String,
    unique: true
  },
  description: String,
  address:String,
  acceptsCreditCard:{
    type:Boolean,
    default:false
  },
  coverImage:String,
  avatarImage:String,
  openHour:Number,
  closeHour:Number,
  _user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

placeSchema.plugin(mongoosePaginate);

placeSchema.methods.updateImage = function(path,imageType){
   return Uploader(path).then(secure_url=>this.saveImageUrl(secure_url,imageType));
};

placeSchema.methods.saveImageUrl = function(secure_url,imageType){
  this[imageType] = secure_url;
  return this.save();
};

placeSchema.pre('save',function(next){
  if (this.slug) return next();
  generateSlugAndContinue.call(this,0,next);
})

placeSchema.statics.validateSlugCount = function(slug){
  return Place.countDocuments({slug:slug}).then(count=>{
    if (count > 0) return false;
    return true;
  });
}

function generateSlugAndContinue(count,next){
  this.slug = slugify(this.title);

  if (count != 0)
     this.slug = this.slug+'-'+count;

  Place.validateSlugCount(this.slug).then(isValid=>{
     if (!isValid)
        return generateSlugAndContinue.call(this,count+1,next);

     return next();
  }).catch(err=>{
    console.log(err);
  });
}

let Place = mongoose.model("Place",placeSchema);
module.exports = Place;
