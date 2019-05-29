const helpers = require('./helpers');

const validParams = ['origins','name'];

const Application = require('../models/Application');

module.exports = {
  find: function (req,res,next){
    Application.findById(req.params.id).then(application=>{
      req.mainObj = application;
      req.application = application;
      next();
    }).catch(next);
  },
  index: function (req,res){
    Application.find({}).then(results=>{
      res.json(results);
    }).catch(err=>{
        res.status(500).json({error});
    })
  },
  create:   function (req,res){
    let params = helpers.paramsBuilder(validParams,req.body);

    Application.create(params)
      .then(application=>{
        res.json(application);
      }).catch(error=>{
        res.status(422).json({error});
      })
  },
  destroy:function (req,res){
    req.application.remove().then(doc=>{
      res.json({})
    }).catch(error=>{
      res.status(500).json({error});
    })
  }
};
