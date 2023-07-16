const mongo = require("mongoose");

var mongoose = require("mongoose");
//Set up default mongoose connection
var mongoDB = process.env.mongodb_url;
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
