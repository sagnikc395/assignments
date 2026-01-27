const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { Admin } = require("../db/index");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username,
    password,
  });

  const token = jwt.sign(
    {
      username,
    },
    JWT_SECRET,
  );

  res.json({
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const isValidatedUser = await Admin.find({
    username,
    password,
  });
  if (isValidatedUser) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET,
    );

    res.json({
      token: token,
    });
  } else {
    res.status(411).json({
      message: "Incorrect email and password",
    });
  }
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
