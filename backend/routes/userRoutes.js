const express = require("express");
const{adminOnly}=require("../middlewares/authMiddleware");

const{protect}=require("../middlewares/authMiddleware");
const{getUsers,getUserById,deleteUser}=require("../controllers/userController");
const router = express.Router();

router.get("/", protect,adminOnly,getUsers);//get all users - admin only
router.get("/:id", protect,getUserById);//get user
router.delete("/:id", protect,adminOnly,deleteUser);//delete user - admin only

module.exports = router;