const express = require("express");
const User = require("./model/User.js");
require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const urldb = process.env.urldb;

//***********************get all users
//@get
app.get("/users", (req, res) => {
  User.find().then((users) => {
    res.send(users);
  });
});
//******************************set one user
//@post
app.post("/users", (req, res) => {
  User.create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
//***************************update one users by id
//@put
app.put("/users/:id", (req, res) => {
  User.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).then((dataUpdate) => {
    res.send(dataUpdate);
  });
});
//************** *************delete one user by id
//@ delete
app.delete("/users/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then(() => {
    res.send("user has been deleted");
  });
});

mongoose
  .connect(urldb)
  .then(() => {
    console.log("data base is connect ");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("server connect");
});
