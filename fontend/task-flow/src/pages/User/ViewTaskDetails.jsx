import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AvatarGroup from "../../components/layouts/AvatarGroup";
import moment from "moment";
import { LuSquareArrowOutUpRight } from "react-icons/lu";


const InfoBox = ({label,value}) => {
    return <>
    <label className="text-xs font-medium text-slate-500">{label}</label>

    <p className="text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5">{value}</p>
    </>
}
const TodoCheckList = ({text,isChecked,onChange}) => {
    return <div className="flex items-center gap-3 p-3">
<input 
type="checkbox"
checked={isChecked} onChange={onChange} className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer "
/>
<p className="text-[13px] text-gray-800">{text}</p>
    </div>
}
const Attachment = ({link,index,onClick}) => {
    return <div
    className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2 cursor-pointer "
    onClick={onClick}
    >
        <div className="flex-1 flex items-center gap-3 ">
            <span className="text-xs text-gray-400 font-semibold mr-2">{index<9?`0${index+1}`:index+1}</span>
            <p className="text-xs text-black">{link}</p>
        </div>
        <LuSquareArrowOutUpRight className="text-gray-400"/>
    </div>
}
const ViewTaskDetails = () => {

    const {id} = useParams();
    const [task,setTask] = useState(null);
    const getStatusTagColor = (status) => {
        switch(status){
            case "In Progress":
                return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
            case "Completed":
                return "text-lime-500 bg-lime-50 border border-lime-500/10";
              default:
                return "text-violet-500 bg-violet-50 border border-violet-500/10";
        }
    };

    const getTaskDetailsByID = async () => {
        try{
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
            if(response.data){
                            console.log("CHECK THIS DATA:", response.data); // <-- Add this line

                const taskInfo = response.data;
                setTask(taskInfo);
            }
        }catch(error){
            console.error("Error fetching user:",error);
        }
    };
const updateTodoChecklist = async (index) => {
  const todoChecklist = [...task?.todoChecklist];
  const taskId = id;

  if(todoChecklist && todoChecklist[index]){
    todoChecklist[index].completed = !todoChecklist[index].completed;
    try{
        const response = await axiosInstance.put(
            API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
            {todoChecklist}
        );
        if(response.status === 200){
            setTask(response.data?.task || task);
        }
        else{
            todoChecklist[index].completed=!todoChecklist[index].completed;
        }
    }catch (error){
        todoChecklist[index].completed = !todoChecklist[index].completed;
    }
  }
};
    const handleLinkClick = (link) =>{
        if (!/^https?:\/\//i.test(link)){
            link = "https://" + link;
        }
        window.open(link,"_blank");
    };
    useEffect(() => {
        if(id) {
            getTaskDetailsByID();
        }
        return () => {};
    } , [id]);

return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {task && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm max-w-4xl mx-auto">
            
            {/* --- Top Section: Title and Status --- */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                {task?.title}
              </h2>
              <div
                className={`text-xs md:text-sm font-medium ${getStatusTagColor(
                  task?.status
                )} px-4 py-1 rounded-full`}
              >
                {task?.status}
              </div>
            </div>

            {/* --- Middle Section: Description --- */}
            <div className="mt-4">
              <InfoBox label="Description" value={task?.description} />
            </div>

            {/* --- Bottom Section: Details Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-4 border-t border-gray-100">
              <div>
                <InfoBox label="Priority" value={task?.priority} />
              </div>

              <div>
                <InfoBox
                  label="Due Date"
                  value={
                    task?.dueDate
                      ? moment(task?.dueDate).format("DD MMM YYYY")
                      : "N/A"
                  }
                />
              </div>
              
              <div>
                <label className="text-xs font-medium text-slate-500">
                  Assigned To
                </label>
                <AvatarGroup
                  avatars={
                    task?.assignedTo?.map((item) => item?.profileImageUrl) || []
                  }
                  maxVisible={5}
                />
              </div>
            </div> {/* <-- The 3-column grid for details ENDS HERE. */}

            {/* --- Todo Checklist Section (Moved outside the grid) --- */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-slate-500">Todo Checklist</label>
              {task?.todoChecklist?.map((item, index) => (
                <TodoCheckList
                  key={`todo_${index}`}
text={item.title}
                  isChecked={item?.completed}
                  onChange={() => updateTodoChecklist(index)}
                />
              ))}
            </div>

            {task?.attachments?.length > 0 &&(
                <div className="mt-2">
                    <label className="text-xs font-medium text-slate-500">
                        Attachments
                    </label>

                    {task?.attachments?.map((link,index)=>
                    (
                        <Attachment
                        key={`link_${index}`}
                        link={link}
                        index={index}
                        onClick={()=>handleLinkClick(link)}
                         />
                    ))}
                    </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );}
export default ViewTaskDetails;


