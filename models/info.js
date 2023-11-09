const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const infoSchema = new Schema({
  title: { type: String },
  image: { type: String },
  description: { type: String },
});

const Info = mongoose.model("Info", infoSchema);
module.exports = Info;
