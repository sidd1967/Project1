const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ArticleTags = require("./tag.model");
const ProfileSchema = new Schema({
  fullName: {
    type: String,
  },
  birthday: {
    type: String,
  },
  city: {
    type: String,
  },
  occupation: {
    type: String,
  },
  bio: {
    type: String,
  },
  /* image:{
        type:String,
    }, */
  interests: [],
  //interests: [{ type: Schema.Types.ObjectId, ref: "ArticleTags" }],
});

module.exports = mongoose.model("Profile", ProfileSchema);
