const Place = require("../models/Place").Place;
const upload = require("../config/upload");


let attributes = ['title','description','acceptsCreditCard','coverImage','avatarImage','openHour','closeHour'];

module.exports = {
  find: function(req,res, next){
    Place.findById(req.params.id)
    .then(place=>{
      req.place = place;
      next();
    }).catch(err=>{
      console.log(err);
      next(err);
    });;
  },
  index: function(req,res){
    Place.paginate({},{page:req.query.page || 1, limit:8, sort:{'_id':-1} }).then(places=>{
      res.json(places);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
  },
  show: function(req,res){
      res.json(req.place);
  },
  store: function(req,res,next){

    let placeParams = {};
    attributes.forEach(attr=>{
        if(Object.prototype.hasOwnProperty.call(req.body,attr))
            placeParams[attr] = req.body[attr];
    });

    Place.create(placeParams).then(place=>{
       req.place = place;
       next();
    }).catch(err=>{
       console.log(err);
       next(err);
    })
  },
  update: function(req,res){

    let placeParams = {};
    attributes.forEach(attr=>{
        if(Object.prototype.hasOwnProperty.call(req.body,attr))
            placeParams[attr] = req.body[attr];
    });

    req.place = Object.assign(req.place,placeParams);

    req.place.save().then(place=>{
      res.json(place);
    }).catch(err=>{
       console.log(err);
       res.json(err);
    });
  },
  destroy: function(req,res){
      req.place.remove()
      .then(place=>{
        res.json(place);
      }).catch(err=>{
         console.log(err);
         res.json(err);
      });
  },
  multerMiddleware: function(){
    return upload.fields([
      {name:'avatarImage',maxCount:1},
      {name:'coverImage',maxCount:1}
    ])
  },
  saveImage: function(req,res){
    if (req.place) {
      const files = ["avatarImage","coverImage"];
      const promises = [];

      files.forEach(imageType=>{
        if (req.files && req.files[imageType]) {
          const path = req.files[imageType][0].path;
          req.place.updateImage(path,imageType);
        }
      });

      Promise.all(promises).then(results=>{
        console.log(results);  
        res.json(req.place);
      }).catch(err=>{
        console.log(err);
        res.json(err);
      });

    }else{
      res.status(422).json({
        error: req.error || "No se pudo guardar la imagen"
      })
    }
  }
};
