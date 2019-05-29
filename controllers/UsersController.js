const User = require("../models/User");
const helpers = require("./helpers");


const validParams = ['email','name','password'];

module.exports = {
  find: function(req,res, next){
    /*Place.findOne({slug:req.params.id})
    .then(place=>{
      req.place = place;
      next();
    }).catch(err=>{
      console.log(err);
      next(err);
    });*/
  },
  index: function(req,res){
    /*Place.paginate({},{page:req.query.page || 1, limit:8, sort:{'_id':-1} }).then(places=>{
      res.json(places);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });*/
  },
  show: function(req,res){
      //res.json(req.place);
  },
  store: function(req,res,next){
    User.create(helpers.paramsBuilder(validParams,req.body)).then(user=>{
       req.user = user;
       next();
    }).catch(err=>{
       console.log(err);
       next(err);
    })
  },
  update: function(req,res){
    /*req.place = Object.assign(req.place,helpers.paramsBuilder(validParams,req.body));

    req.place.save().then(place=>{
      res.json(place);
    }).catch(err=>{
       console.log(err);
       res.json(err);
    });*/
  },
  destroy: function(req,res){
      /*req.place.remove()
      .then(place=>{
        res.json(place);
      }).catch(err=>{
         console.log(err);
         res.json(err);
      });*/
  },
  myPlaces: function(req,res){
    User.findOne({'_id': req.user.id}).then(user=>{
      console.log(user.places);
      user.places.then(places=>{
        res.json(places);
      })
    }).catch(err=>{
      console.log(err);
      res.json(err);
    })

  }
};
