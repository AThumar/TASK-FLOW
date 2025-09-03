const Task = require("../models/Task");

//@desc get all tasks
//@route get /api/tasks/
//@access private
const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    let tasks;
    if (req.user.role === 'admin') {
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    } else {
      tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    }

    // add completed todoChecklist count to each task
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedCount = task.todoChecklist.filter(item => item.completed).length;
        return {
          ...task._doc,
          completedTodoCount: completedCount,
        };
      })
    );

    const allTasks = await Task.countDocuments(
      req.user.role === 'admin' ? {} : { assignedTo: req.user._id }
    );

    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: 'Pending',
      ...(req.user.role !== 'admin' && { assignedTo: req.user._id }),
    });

    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: 'In-progress',
      ...(req.user.role !== 'admin' && { assignedTo: req.user._id }),
    });

    const completedTasks = await Task.countDocuments({
      ...filter,
      status: 'Completed',
      ...(req.user.role !== 'admin' && { assignedTo: req.user._id }),
    });

    res.json({
      tasks,
      statusSummary: {
        all: allTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



//@desc get task by id
//@route get /api/task/:id
//@access private
const getTaskById = async (req, res) => {try{
    const task =await Task.findById(req.params.id).populate("assignedTo","name email profileImageUrl");
    if(!task) return res.status(404).json({message:"Task not found"});
    res.json(task);
}
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
    if(!Array.isArray(assignedTo)){
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
const updateTask = async (req, res) => {try{
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({message:"Task not found"});
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
    task.attachments = req.body.attachments || task.attachments;
    task.status = req.body.status || task.status;

if(req.body.assignedTo){
    if(!Array.isArray(req.body.assignedTo)){
        return res.status(400).json({message:"assignedTo must be an array of user IDs"});
    }
    task.assignedTo = req.body.assignedTo;
}
const updatedTask = await task.save();
res.json({message:"Task Updated successfully",updatedTask});}
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server Error" , error: error.message });
    }};

//@desc delete task
//@route delete /api/tasks/:id
//@access private
const deleteTask = async (req, res) => {try{
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({message:"Task not found"});
    await task.deleteOne();
    res.json({message:"Task deleted successfully"});
}
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server Error" , error: error.message });
    }};

//@desc update task status
//@route put /api/tasks/:id/status
//@access private
const updateTaskStatus = async (req, res) => {try{
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({message:"Task not found"});

    const isAssigned = task.assignedTo.some(userId => userId.toString() === req.user._id.toString());

    if(!isAssigned && req.user.role !== 'admin'){
        return res.status(403).json({message:"You are not authorized to update the status of this task"});
    }
task.status = req.body.status || task.status;

  // ✅ Fix: Allow updating status here as well
    if (req.body.status) {
      task.status = req.body.status;
      if (task.status === "Completed") {
        task.todoChecklist.forEach(item => (item.completed = true));
        task.progress = 100;
      }
    }
await task.save();
res.json({message:"Task status updated successfully",task});

console.log("Incoming status:", req.body.status);

}
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server Error" , error: error.message });
    }};

//@desc update task checklist
//@route put /api/tasks/:id/todo
//@access private
const updateTaskChecklist = async (req, res) => {try{
    const{todoChecklist} = req.body;
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({message:"Task not found"});
    if(!task.assignedTo.includes(req.user._id) && req.user.role !== 'admin'){
        return res.status(403).json({message:"You are not authorized to update the checklist of this task"});
    }
    task.todoChecklist=todoChecklist;

    const completedCount = todoChecklist.filter(item => item.completed).length;
    const totalItems = task.todoChecklist.length;
    task.progress = totalItems>0? Math.round((completedCount/totalItems)*100):0;

    if(task.progress === 100){
        task.status = "Completed";
    }else if(task.progress > 0){
        task.status = "In-progress";
    }else{
        task.status = "Pending";
    }
    await task.save();
    const updatedTask = await Task.findById(req.params.id).populate("assignedTo","name email profileImageUrl");
    res.json({message:"Task checklist updated successfully",updatedTask});
}
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server Error" , error: error.message });
    }};

//@desc dashboard data (admin)
//@route get /api/tasks/dashboard-data
//@access private
const getDashboardData = async (req, res) => {try{
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({status:"Completed"});
    const pendingTasks = await Task.countDocuments({status:"Pending"});
    const overdueTasks = await Task.countDocuments({status: {$ne:'Completed'}, dueDate: {$lt: new Date()}});

    const taskStatus = ["Pending", "In-progress", "Completed"];
    const taskDistributionRow = await Task.aggregate([
        {
            $group:{
                _id:"$status",
                count:{$sum:1}
            },
        },
    ]);

    const taskDistribution = taskStatus.reduce((acc,status)=>{
        const formattedKey = status.replace(/\s+/g,"");
        acc[formattedKey] = taskDistributionRow.find((item)=>item._id === status)?.count || 0;
        return acc;
        
    },{});
    taskDistribution["All"]= totalTasks;

    const taskPriorities = ["Low", "Medium", "High"];
    const priorityDistributionRow = await Task.aggregate([
        {
            $group:{
                _id:"$priority",
                count:{$sum:1}
            },
        },
    ]);
    const taskPriorityLevels = taskPriorities.reduce((acc,priority)=>{
        acc[priority]= priorityDistributionRow.find((item)=>item._id === priority)?.count || 0;
        return acc;
    },{});

    const recentTasks = await Task.find().sort({createdAt:-1}).limit(10).select("title status priority dueDate createdAt");

    res.status(200).json({
        statistics:{
            totalTasks,
            completedTasks,
            pendingTasks,
            overdueTasks,
        },
        charts:{
            taskDistribution,
            taskPriorityLevels,
        },
        recentTasks,
    });
}
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
