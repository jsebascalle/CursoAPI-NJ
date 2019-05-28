const mongoose = require("mongoose");
const dbName = 'curso_api';
const port = 27017;

module.exports = {
  connect: ()=> mongoose.connect('mongodb://localhost:'+port+'/'+dbName, {useNewUrlParser: true}),
    dbName,
    connection: ()=>{
      if (mongoose.connection)
          return mongoose.connection;

      return this.connect();
    }
}
