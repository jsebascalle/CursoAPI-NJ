function paramsBuilder(validParams,body){
  let placeParams = {};
  validParams.forEach(attr=>{
      if(Object.prototype.hasOwnProperty.call(body,attr))
          placeParams[attr] = body[attr];
  });

  return placeParams;
}


module.exports = {paramsBuilder};
