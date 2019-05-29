const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets")
const User = require('../models/User');

module.exports = {
  authenticate:function (req,res,next){
    User.findOne({email: req.body.email})
      .then(user=>{
        user.verifyPassword(req.body.password)
          .then(valid=>{
            if(valid){
              req.user = user;
              next();
            }else{
              next(new Error('Invalid Credentials'));
            }
          })
      }).catch(error=> next(error));
  },
  generateToken: function(req,res, next){
    if (!req.user) return next();

    req.token = jwt.sign({id:req.user.id},secrets.jwtSecret);

    next();
  },
  sendToken: function(req,res){
    if(req.user){
      res.json({
        user: req.user,
        jwt: req.token
      })
    }else{
      res.status(422).json({
        error: 'Could not create user'
      })
    }
  }
};
