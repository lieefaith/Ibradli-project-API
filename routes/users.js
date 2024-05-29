const express = require("express");
const router = express.Router();


const {
  register,
  login,
  me,
  logout,
} = require("../controllers/userControllers");
const authentication = require("../middleware/authentication");

// Routes
router.post("/registerUser", register);
router.post("/loginUser", login);
router.get("/catchUser", authentication, me);
router.post("/logoutUser", authentication, logout);

module.exports = router;
