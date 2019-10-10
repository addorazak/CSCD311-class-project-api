const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const studentSchema = new mongoose.Schema({
  student_id: Number,
  pin: Number,
  name: String,
  gender: String,
  level: Number,
  hall: String,
  room: String
});

const Students = mongoose.model("Student", studentSchema, "students");
app.post("/login", async (req, res) => {
  let student = await Students.findOne(req.body);
  if (student)
    res.json(student);
  else
    res.send("not_found");
})

app.post("/register", async (req, res) => {
  let student = await Students.findOne({ student_id: req.body.student_id });
  if (student.hall) // Student already registered
    res.send("fail");
  else {
    student.hall = req.body.hall;
    student.room = req.body.room;
    await student.save();
    res.send("success");
  }
})

mongoose.connect("mongodb+srv://joe:mongojoe18@cluster0-7mtcg.mongodb.net/ug-hall?retryWrites=true&w=majority");
app.listen(1000, () => {
  console.log("Web Server Started");
})