const Place = require("../models/Place").Place;

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
  store: function(req,res){

    let placeParams = {};
    attributes.forEach(attr=>{
        if(Object.prototype.hasOwnProperty.call(req.body,attr))
            placeParams[attr] = req.body[attr];
    });

    Place.create(placeParams).then(place=>{
       res.json(place);
    }).catch(err=>{
       console.log(err);
       res.json(err);
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
  }
};
