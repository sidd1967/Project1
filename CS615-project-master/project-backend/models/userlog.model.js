const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserLogSchema = new Schema({
  fullName: { type: String },
  emailId: { type: String },
  timestamp: { type: Date, required: true },
  action: { type: String, required: true },
  articleId: { type: String },
  articleTitle: { type: String },
});

const UserLog = mongoose.model("UserLog", UserLogSchema, "userlog");

module.exports = UserLog;
