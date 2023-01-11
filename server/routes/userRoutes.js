const express = require("express");
const router = express.Router();

const { registerUser, authUser, allUsers } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");



router.route("/").post(registerUser).get(protect, allUsers); //chaining routes
router.post("/login", authUser);


module.exports = router;