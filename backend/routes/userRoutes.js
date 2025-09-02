const express = require("express");
const{adminOnly}=require("../middlewares/authMiddleware");
const{protect}=require("../middlewares/authMiddleware");
const{getUsers,getUserById}=require("../controllers/userController");

const router = express.Router();

router.get("/", protect,adminOnly,getUsers);//get all users - admin only
router.get("/:id", protect,getUserById);//get user

module.exports = router;