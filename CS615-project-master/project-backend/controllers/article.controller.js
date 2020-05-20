const Article = require("../models/article.model");
const User = require("../models/user.model");
const ArticleTags = require("../models/tag.model");
const ArticleLock = require("../models/locks.model");
const UserLog = require("../models/userlog.model");

const bcrypt = require("bcrypt");

exports.getall_articles = function (req, res, next) {
  Article.find()
    .then((article) => res.json(article))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

exports.get_my_articles = function (req, res, next) {
  User.findOne({ emailId: req.decoded.email })
    .populate("profile")
    .then((user) => {
      if (user.profile.interests !== undefined) {
        Article.find({ tags: { $in: user.profile.interests } })
          .sort({ createdAt: "desc" })
          .then((article) => res.json(article))
          .catch((err) => res.status(400).json(`Error: ${err}`));
      } else {
        res.status(404).send();
      }
    });
};

exports.article_add = function (req, res, next) {
  const newArticle = new Article({
    title: req.body.title,
    article: req.body.article,
    authorname: req.body.authorname,
    tags: req.body.tags,
  });

  const user6 = new UserLog({
    fullName: req.body.authorname,
    timestamp: new Date(),
    action: "ARTICLE ADDITION",
    articleTitle: req.body.title,
  });
  newArticle
    .save()
    .then(() =>
      user6
        .save()
        .then(() => res.json("New article posted successfully"))
        .catch((err) => res.status(400).json(`Error : ${err}`))
    )
    .catch((err) => res.status(400).json(`Error : ${err}`));
};

exports.get_article_byId_search = function (req, res, next) {
  Article.findById(req.params.id)
    .then(async function (articleResp) {
      let articlehistory = await UserLog.find({
        articleId: req.params.id,
      }).sort({ createdAt: "desc" });
      var finalArticle = {
        title: articleResp.title,
        authorname: articleResp.authorname,
        createdAt: articleResp.createdAt,
        article: articleResp.article,
        tags: articleResp.tags,
        history: articlehistory,
      };
      res.json(finalArticle);
    })
    .catch((err) => res.status(400).json("Fail"));
};

exports.get_article_byId = function (req, res, next) {
  const lockFile = new ArticleLock({
    id: req.params.id,
    emailId: req.decoded.email,
    timestamp: new Date(),
  });

  ArticleLock.findOne({ id: req.params.id })
    .then(function (article_lock) {
      if (!article_lock) {
        Article.findById(req.params.id)
          .then(function (article) {
            lockFile
              .save()
              .then(() => res.json(article), console.log("lock created"))
              .catch((err) => res.status(400).json(`Error : ${err}`));
          })
          .catch((err) => res.status(400).json(`Error : ${err}`));
      } else {
        res.status(404).json("Failed");
      }
    })

    .catch((err) => res.status(400).json(`Error : ${err}`));
};

exports.delete_article_byId = function (req, res, next) {
  const user7 = new UserLog({
    timestamp: new Date(),
    action: "ARTICLE DELETION",
    articleId: req.params.id,
    emailId: req.decoded.email,
    fullName: req.decoded.name,
  });
  Article.findByIdAndDelete(req.params.id)
    .then(() =>
      user7
        .save()
        .then(() => res.json("Article is deleted"))
        .catch((err) => res.status(400).json(`Error: ${err}`))
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

exports.edit_article_byId = function (req, res, next) {
  const user5 = new UserLog({
    emailId: req.decoded.email,
    fullName: req.decoded.name,
    timestamp: new Date(),
    action: "ARTICLE UPDATION",
    articleId: req.params.id,
  });
  Article.findById(req.params.id)
    .then((article) => {
      article.title = req.body.title;
      article.article = req.body.article;
      article.authorname = req.body.authorname;
      article.tags = req.body.tags;
      //update ==>
      article
        .save()
        .then(() =>
          ArticleLock.findOneAndRemove({ id: req.params.id })
            .then(() =>
              user5
                .save()
                .then(() => res.json("Lock DELETED and Log Updated"))
                .catch(() => console.log("Failed 1"))
            )
            .catch(() => console.log("Failed 2"))
        )
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

exports.unlockArticle = function (req, res, next) {
  ArticleLock.findOneAndRemove({ id: req.params.id })
    .then(() => res.json())
    .catch((err) => res.json(`${err}`));
};
