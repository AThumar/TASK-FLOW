import React from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
const Dashboard = () => {
        useUserAuth();

        const {user} = useContext(UserContext);
    return  <div>
        Admin Dashboard
        {JSON.stringify(user)}
        </div>
    ;
};
export default Dashboard;