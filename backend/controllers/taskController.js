const Task = require("../models/Task");

//@desc get all tasks
//@route get /api/tasks/
//@access private
const getTasks = async (req, res) => {
    try{}
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server Error" , error: error.message });
    }
};

//@desc get task by id
//@route get /api/task/:id
//@access private
const getTaskById = async (req, res) => {try{}
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server Error" , error: error.message });
    }};

//@desc create new task
//@route post /api/tasks/
//@access private
const createTask = async (req, res) => {try{
    const{
        title,
        description,
        priority,
        dueDate,
        assignedTo,
        attachments,
        todoChecklist,
    } = req.body;
    if(!Array.isArrsy(assignedTo)){
        return res.status(400).json({message:"assignedTo must be an array of user IDs"});
    }
    const task = await Task.create({
        title,
        description,
        priority,
        dueDate,
        assignedTo,
        createdBy: req.user._id,
        todoChecklist,
        attachments,
    });

    res.status(201).json({message:"Task created successfully",task});
}
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server Error" , error: error.message });
    }};  

//@desc update task
//@route put /api/tasks/:id
//@access private
const updateTask = async (req, res) => {try{}
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server Error" , error: error.message });
    }};

//@desc delete task
//@route delete /api/tasks/:id
//@access private
const deleteTask = async (req, res) => {try{}
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server Error" , error: error.message });
    }};

//@desc update task status
//@route put /api/tasks/:id/status
//@access private
const updateTaskStatus = async (req, res) => {try{}
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server Error" , error: error.message });
    }};

//@desc update task checklist
//@route put /api/tasks/:id/todo
//@access private
const updateTaskChecklist = async (req, res) => {try{}
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server Error" , error: error.message });
    }};

//@desc dashboard data (admin)
//@route get /api/tasks/dashboard-data
//@access private
const getDashboardData = async (req, res) => {try{}
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server Error" , error: error.message });
    }};

//@desc dashboard data(user)
//@route get /api/tasks/user-dashboard-data
//@access private
const getUserDashboardData =async(req,res)=>{try{}
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server Error" , error: error.message });
    }};

module.exports={
    getTasks,getTaskById,createTask,updateTask,deleteTask,updateTaskStatus,updateTaskChecklist,getDashboardData,getUserDashboardData
}
