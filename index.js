const express = require("express");
const mongoose = require("mongoose");
const Info = require("./models/info.js");

const app = express();

const MONGO_URL = "mongodb://127.0.0.1:27017/projectmanagement";

main()
  .then(() => {
    console.log("Conneted to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.use(express.urlencoded({ extended: true }));

//home page
app.get("/content", async (req, res) => {
  const allInfo = await Info.find({});
  res.render("./index.ejs", { allInfo });
});

app.get("/content/new", (req, res) => {
  res.render("./new.ejs");
});

//delete
app.post("/content/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Info.findByIdAndDelete(id);
  res.redirect("/content");
});

// req come from edit page come here and it will save in db and redirect to home page
app.post("/content/save", async (req, res) => {
  const info = new Info(req.body.info);
  await info.save();
  res.redirect("/content");
});

// find id and return whole content
app.get("/content/:id", async (req, res) => {
  const { id } = req.params;
  const info = await Info.findById(id);
  console.log(info);
  res.render("./show.ejs", { info });
});

app.listen(3000, console.log("server is running"));
