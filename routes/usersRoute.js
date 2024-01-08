const express = require("express");
const {
  register,
  login,
  getProfile,
  updateProfile
} = require("../controllers/UserControllers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);
router.put("/update-profile", updateProfile);

module.exports = router;
