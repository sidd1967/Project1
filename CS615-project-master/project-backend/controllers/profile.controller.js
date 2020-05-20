const Profile = require("../models/profile.model");
const ArticleTags = require("../models/tag.model");
const User = require("../models/user.model");
const UserLog = require("../models/userlog.model");

exports.display_profile = function (req, res, next) {
  const errors = {};
  User.findOne({ emailId: req.decoded.email }, { password: 0 })
    .populate({ path: "profile", model: "Profile" })
    .then((user) => {
      if (!user) {
        errors.noprofile = "There no profile for the user";
        return res.status(404).json(errors);
      }
      res.json(user);
    })
    .catch((err) => res.status(404).json(err));
};

exports.edit_profile = function (req, res, next) {
  //console.log(req);
  const user10 = new UserLog({
    emailId: req.decoded.email,
    fullName: req.decoded.name,
    timestamp: new Date(),
    action: "EDITED PROFILE",
  });

  User.findById(req.params.id)
    .then((user) => {
      var profile = {};
      profile.birthday = req.body.profile.birthday;
      profile.city = req.body.profile.city;
      profile.occupation = req.body.profile.occupation;
      profile.bio = req.body.profile.bio;
      profile.interests = req.body.profile.interests || [];
      //update ==>
      Profile.findByIdAndUpdate(req.body.profile._id, profile, {
        new: true,
      }).then((profileNew) => {
        user.profile = profileNew;
        user.save().then((user) =>
          user10
            .save()
            .then(() => res.json(user))
            .catch((err) => res.status(400).json(`Error: ${err}`))
        );
      });
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
  //});
};
