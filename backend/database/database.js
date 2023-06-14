const mongo = require('mongoose')

var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017';
mongoose.connect(mongoDB, { useNewUrlParser: true });
 //Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//---------------------- Actual Code--------------------------



// mongo
//   .connect(process.env.CONNECTION_PORT, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log(`Congratulations, Mongo is runing`)
//   })
//   .catch((e) => {
//     console.log(`Dont like errors but here it is\n ${e}`)
//   })
