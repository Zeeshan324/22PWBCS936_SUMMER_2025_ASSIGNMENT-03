const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Get all students with search & sort
router.get("/", async (req, res) => {
  const { search, sort } = req.query;
  let query = {};
  if (search) query = { $or: [{ name: new RegExp(search, "i") }, { department: new RegExp(search, "i") }] };
  
  let students = await Student.find(query);
  if (sort === "gpa") students = students.sort((a, b) => b.gpa - a.gpa);
  if (sort === "name") students = students.sort((a, b) => a.name.localeCompare(b.name));

  res.render("students", { students });
});

// Add student form
router.get("/add", (req, res) => res.render("addStudent"));

// Create student
router.post("/add", async (req, res) => {
  try {
    await Student.create(req.body);
    res.redirect("/students");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

// View single student
router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render("studentDetails", { student });
});

// Edit form
router.get("/edit/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render("editStudent", { student });
});

// Update student
router.post("/edit/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/students");
});

// Delete student
router.get("/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect("/students");
});

module.exports = router;
