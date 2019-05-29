const helpers = require('./helpers');

const validParams = ['_place','reaction','observation'];

const Visit = require('../models/Visit');
const User = require('../models/User');

module.exports = {
  find :function (req,res,next){
    Visit.findById(req.params.visit_id).then(visit=>{
      req.mainObj = visit;
      req.visit = visit;
      next();
    }).catch(next);
  },
  index: function (req,res){
    //req.user
    let promise = null;

    if(req.place){
      promise = req.place.visits;
    }else if(req.user){
      promise = Visit.forUser(req.user.id, req.query.page || 1)
    }

    if(promise){
      promise.then(visits=>{
        res.json(visits);
      }).catch(error=>{
        res.status(500).json({error})
      })
    }else{
      res.status(404).json({});
    }
  },
  create: function (req,res){
    let params = helpers.paramsBuilder(validParams,req.body);
    params['_user'] = req.user.id;

    Visit.create(params)
      .then(visit=>{
        res.json(visit);
      }).catch(error=>{
        res.status(422).json({error});
      })
  },
   destroy :function(req,res){
    req.visit.remove().then(doc=>{
      res.json({})
    }).catch(error=>{
      res.status(500).json({error});
    })
  }

};
