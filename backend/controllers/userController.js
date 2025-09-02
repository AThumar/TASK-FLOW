const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//@desc get all users
//@route GET /api/users
//@access Private (admin only)
const getUsers = async (req, res) => {try{
    const users = await User.find({role:'member'}).select('-password');
    //Add task counts to individual user
    const userWithTaskCounts = await Promise.all(users.map(async(user)=>{
        const pendingTasks = await Task.countDocuments({assignedTo: user._id,status :"Pending"});
        const inProgressTasks = await Task.countDocuments({assignedTo: user._id,status :"In Progress"});
        const CompletedTasks = await Task.countDocuments({assignedTo: user._id,status :"Completed"});

        return{
            ...user._doc,
            pendingTasks,
            inProgressTasks,
            CompletedTasks,
        };

    }))
    res.json(userWithTaskCounts);
}
catch (error) {
  
    res.status(500).json({ message: 'Server error', error: error.message });
}
};

//@desc get user by id
//@route GET /api/users/:id
//@access Private (admin only)
const getUserById = async (req, res) => {try{
    const user = await User.findById(req.params.id).select('-password');
    if(!user){
        return res.status(404).json({message:"User not found"});
        
    }
    res.json(user);
}
catch (error) {
  
    res.status(500).json({ message: 'Server error', error: error.message });
}};


module.exports = { getUsers, getUserById };