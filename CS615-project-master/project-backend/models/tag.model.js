const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  label: { type: String, required: false },
  value: { type: String, required: false, index: { unique: true } },
});

const ArticleTags = mongoose.model("ArticleTags", TagSchema, "article_tags");

module.exports = ArticleTags;
