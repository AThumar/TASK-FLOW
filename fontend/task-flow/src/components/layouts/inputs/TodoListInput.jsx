// import React from "react";
// import { useState } from "react";
// import {HiMiniPlus , HiOutlineMinus} from "react-icons/hi2"
// import { HiOutlineTrash } from "react-icons/hi2";
// const TodoListInput = ({todoList , setTodolist}) => {
//     const [option , setOption] = useState("");

//     const handleAddOption = () => {
//         if(option.trim()){
//             setTodolist([...todoList , option.trim()]);
//             setOption("");
//         }
//     };

//     const handleDeleteOption = (index) => {
//         const updatedArr = todoList.filter((_,idx )=> idx !== index);
//         setTodolist(updatedArr);
//     }


//     return (
//         <div>
//             {todoList.map((item , index) => <div 
//             key={item}
//             className=""
//             >
//                 <p>
//                     <span>
//                         {index < 9 ? `0${index + 1}` : index + 1}
//                     </span>
//                     {item}
//                 </p>
//                 <button
//                 onClick={() => handleDeleteOption(index)}
//                 className="" 
//                 >
//                     <HiOutlineTrash />
//                     </button>
//                     </div>

//         }
//         </div>

//         <div>
//             <input
// type = "text"
// placeholder="Enter Task"
// value = {option}
// onChange={({target}) => setOption(target.value)}
// className=""

//             />
//             <button>
//                 <HiMiniPlus/>Add
//             </button>
//         </div>
//     )

// export default TodoListInput;

import React from "react";
import { useState } from "react";
import {HiMiniPlus , HiOutlineMinus} from "react-icons/hi2"
import { HiOutlineTrash } from "react-icons/hi2";
const TodoListInput = ({todoList , setTodolist}) => {
const [option , setOption] = useState("");

const handleAddOption = () => {
 if(option.trim()){
 setTodolist([...todoList , option.trim()]);
 setOption("");
 }
 };

 const handleDeleteOption = (index) => {
 const updatedArr = todoList.filter((_,idx )=> idx !== index);
 setTodolist(updatedArr);
 }


return (
        <>
 <div>
 {todoList.map((item , index) => <div
 key={item}
 className=""
 >
 <p>
<span>
 {index < 9 ? `0${index + 1}` : index + 1}
 </span>
 {item}
 </p>
 <button
 onClick={() => handleDeleteOption(index)}
 className=""
 >
 <HiOutlineTrash />
</button>

                </div> 
 )} 
 </div>

 <div>
 <input
type = "text"
placeholder="Enter Task"
value = {option}
onChange={({target}) => setOption(target.value)}
className=""
 />
 <button>
 <HiMiniPlus/>Add
 </button>
 </div>
        </>
 );
}
export default TodoListInput;