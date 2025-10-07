import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { LuUsers } from "react-icons/lu";
import Modal from "../../Modal";
import AvatarGroup from "../../layouts/AvatarGroup";

const SelectUsers = ({selectedUsers , setSelectedUsers}) => {
    const [allUsers , setAllUsers] = useState([]);
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [tempSelectedUsers , setTempSelectedUsers] = useState([]);

    const getAllUsers = async() => {
        try {
            // API call to fetch all users
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            if(response.data?.length>0){
                setAllUsers(response.data);
            }
         console.log("All Users:", response.data);
    }
        catch(error){
            console.log("Error fetching users", error);
        }
    };

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev)=>prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev , userId]);
    }

    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers);
        setIsModalOpen(false);
    };

  // Corrected line
// const selectedUserAvatars = allUsers
//     .filter((user) => selectedUsers.includes(user._id || user.id))
//     .map((user) => user.profileImageUrl);
const selectedUserAvatars = allUsers
  .filter((user) => selectedUsers.includes(user._id) || selectedUsers.includes(user.id))
  .map((user) => user.profileImageUrl);

console.log("Avatars to show:", selectedUserAvatars);


    useEffect(() => {
        getAllUsers();
    }, []);

        // useEffect(() => {
        //     if(selectedUsers.length > 0){
        //         setTempSelectedUsers([]);
        //     }
        //     return () => {};
        // }, [selectedUsers]);
    return <div className="space-y-4 mt-2">
        {selectedUserAvatars.length === 0 && (
            <button className="card-btn"  onClick={() => {
    setTempSelectedUsers(selectedUsers); // ✅ preload
    setIsModalOpen(true);
  }}>
                <LuUsers className="text-sm"/>
                Add Members</button>
        )}

        {selectedUserAvatars.length > 0 && (
            <div onClick={()=>setIsModalOpen(true)} className="cursor-pointer">
                <AvatarGroup avatars = {selectedUserAvatars} maxVisible={3}/>
            </div>
        )}
        <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
        >
            <div className=" h-[60vh] overflow-y-auto">
            {/* {allUsers.map((user) => (
                <div 
                key={user.id || user.id || user.email}
                className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <img
                    src={user.profileImageUrl}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                    />
                   
                        <div className=" ml-3 flex-1">
                            <p className="font-medium text-gray-800 ">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                  
                    <input
                    type="checkbox"
                    checked={tempSelectedUsers.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                    className="w-4 h-4 text-blue-600 rounded-md cursor-pointer ml-auto"
                    />
                </div>

            ))} */}
            {allUsers.map((user) => (
  <div 
    key={user._id || user.id || user.email} 
    className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
  >
    <img
      src={user.profileImageUrl || ""}
      alt={user.name || "User"}
      className="w-12 h-12 rounded-full object-cover"
    />
    <div className="ml-3 flex-1">
      <p className="font-medium text-gray-800">{user.name || "Unnamed"}</p>
      <p className="text-sm text-gray-500">{user.email || "No Email"}</p>
    </div>
    <input
      type="checkbox"
      checked={tempSelectedUsers.includes(user._id || user.id)}
      onChange={() => toggleUserSelection(user._id || user.id)}
      className="w-4 h-4 text-blue-600 rounded-md cursor-pointer ml-auto"
    />
  </div>
))}

            </div>
            
            <div className="flex justify-end gap-4 mt-4">
                <button className="card-btn" onClick={() => setIsModalOpen(false)}>CANCEL</button>
                <button className="card-btn-fill" onClick={handleAssign}>DONE</button>
            </div>
            </Modal>
    </div>;
}

export default SelectUsers;