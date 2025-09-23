import {
    LuLayoutDashboard,
    LuUsers,
    LuSquarePlus,
    LuLogout,
    LuClipboardCheck,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id:"01",
        label:"Dashboard",
        icon:LuLayoutDashboard,
        path:"/admin/dashboard",
    },
     {
        id:"02",
        label:"Manage Tasks",
        icon:LuClipboardCheck,
        path:"/admin/tasks",
    },
    {
        id:"03",
        label:"Create Tasks",
        icon:LuSquarePlus,
        path:"/admin/create-task",
    },
      {
        id:"04",
        label:"Team Members",
        icon:LuUsers,
        path:"/admin/users",
    },
      {
        id:"05",
        label:"Logout",
        icon:LuLogout,
        path:"logout",
    },
]