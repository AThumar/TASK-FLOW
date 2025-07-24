import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Admin/Dashboard";
import ManageTasks from "./pages/Admin/ManageTasks";
import CreateTask from "./pages/Admin/CreateTask";
import ManageUsers from "./pages/Admin/ManageUsers";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login " element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/*Admin Dashboard*/}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/taska" element={<ManageTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>
          </Routes>
      </Router>
     </div>
  );
}
export default App;