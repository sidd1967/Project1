const mongoose = require("mongoose");
const Profile = require("./profile.model");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

let UserSchema = new Schema({
  emailId: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  profile: { type: Schema.Types.ObjectId, ref: "Profile" },
});

UserSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Export the model
module.exports = mongoose.model("User", UserSchema, "user_access");
