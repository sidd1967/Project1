let mongoose = require("mongoose");
const envs = require("./configurations");
mongoose.connect(`${envs.MONGO_URL}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
});
mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function (callback) {
  console.log("Connection Succeeded.");
});
module.exports = db;
