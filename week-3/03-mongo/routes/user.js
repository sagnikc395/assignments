const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  await User.create({
    username,
    password,
  });
  res.json({
    message: "User created successfully!",
  });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const repsonse = await Course.find({});

  res.json({
    courses: repsonse,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.params.username;

  //update the user object in the mongodb database.
  await User.updateOne(
    {
      username: username,
    },
    {
      purchasedCourses: {
        $push: new mongoose.Types.ObjectId(courseId),
      },
    },
  ).catch((e) => {
    console.log(e);
  });

  res.json({
    message: "Course Purchased Successfully!",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({
    username: req.headers.username,
  });

  //console.log(user.purchasedCourses);

  //find all the courses, where the course id matches the purchased one
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.json({
    msg: courses,
  });
});

module.exports = router;
