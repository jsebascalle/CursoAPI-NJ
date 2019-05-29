const Place = require("../models/Place");
const upload = require("../config/upload");
const helpers = require("./helpers");


const validParams = ['title','description','acceptsCreditCard','coverImage','avatarImage','openHour','closeHour','address'];

module.exports = {
  find: function(req,res, next){
    Place.findOne({slug:req.params.id})
    .then(place=>{
      req.place = place;
      req.mainObj = place;
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
    let params = helpers.paramsBuilder(validParams,req.body);
    params['_user'] = req.user.id;
    Place.create(params).then(place=>{
       req.place = place;
       next();
    }).catch(err=>{
       console.log(err);
       next(err);
    })
  },
  update: function(req,res){
    req.place = Object.assign(req.place,helpers.paramsBuilder(validParams,req.body));

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
          promises.push(req.place.updateImage(path,imageType));
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
