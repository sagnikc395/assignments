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

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
});

module.exports = router;
