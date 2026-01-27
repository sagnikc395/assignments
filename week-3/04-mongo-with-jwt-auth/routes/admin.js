const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("..");
const { User, Admin } = require("../db/index");

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

  const isValidatedUser = await User.find({
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

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
});

module.exports = router;
