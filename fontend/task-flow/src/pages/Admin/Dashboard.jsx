import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment/moment";
import InfoCard from "../../components/cards/InfoCard";
import { IoMdCard } from "react-icons/io";
import { addThousandSeparators } from "../../utils/helper";

const Dashboard = () => {
        useUserAuth();

        const {user} = useContext(UserContext);

        const navgate = useNavigate();

        const [dashboardData, setDashboardData] = useState(null);
        const [pieChartData, setPieChartData] = useState([]);
        const [barChartData, setBarChartData] = useState([]);

        const getDashboardData = async() => {
            try{
                const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
             ; 
            if(response.data){
                setDashboardData(response.data);
            }
            }catch(error){
                console.log("Error while fetching dashboard data", error);
            }

        };
        useEffect(() => {
            getDashboardData();
            return( ) => {};
        }, []);
    return  <DashboardLayout activeMenu="Dashboard">
        <div className="card my-5">
            <div>
                <div className="col-span-3">
                    <h2 className="text-xl md:text-2xl">Hello !!! {user?.name}</h2>
                    <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">{moment().format("dddd Do MMM YYYY")}</p>

                </div>
            </div>
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
    <InfoCard 
    // icon = {<IoMdCard />  }
    label = "Total Tasks"
    value = {addThousandSeparators(dashboardData?.charts?.taskDistribution?.All || 0)}
    color = "bg-primary"
    ></InfoCard>
     <InfoCard 
    // icon = {<IoMdCard />  }
    label = "Pending Tasks"
    value = {addThousandSeparators(dashboardData?.charts?.taskDistribution?.Pending || 0)}
    color = "bg-violet-500"
    ></InfoCard>
     <InfoCard 
    // icon = {<IoMdCard />  }
    label = "In Progress Tasks"
    value = {addThousandSeparators(dashboardData?.charts?.taskDistribution?.InProgress || 0)}
    color = "bg-cyan-500"
    ></InfoCard>
     <InfoCard 
    // icon = {<IoMdCard />  }
    label = "Completed Tasks"
    value = {addThousandSeparators(dashboardData?.charts?.taskDistribution?.Completed || 0)}
    color = "bg-lime-500"
    ></InfoCard>
</div>
        </div>
        </DashboardLayout>
    ;
};
export default Dashboard;