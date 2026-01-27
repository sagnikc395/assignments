const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  //check if user with this username already exists
  await Admin.create({
    username: username,
    password: password,
  })
    .then(function () {
      res.status(200).json({
        message: "Admin created successfully!",
      });
    })
    .catch(() => {
      res.status(403).json({
        message: "Could not create Admin!",
      });
    });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  //TODO input validation using Zod

  //add to course -> if key and value are same, then can just use key name
  const obj = await Course.create({
    title,
    description,
    imageLink,
    price,
  });

  const courseId = obj._id;

  res.json({
    message: "Course created successfully",
    courseId: courseId,
  });
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
});

module.exports = router;
