import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/User/Login";
import SignUp from "./Components/User/SignUp";
import ForgetPass from "./Components/User/ForgetPass";
import ResetPass from './Components/User/ResetPass';
import AddVehicle from './Components/Vehicle/admin/AddVehice';
import EditVehicle from "./Components/Vehicle/admin/EditVehicle";
import Dashboard from "./Components/Vehicle/admin/Dashboard";
import UserDash from "./Components/Vehicle/user/UserDash";

function App() {
  let isAdmin = localStorage.getItem("isAdmin");
  console.log(isAdmin);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgetpass' element={<ForgetPass />} />
        <Route path='/reset-password/:token' element={<ResetPass />} />

        {/* Admin routes */}
        {isAdmin === "true" ? (
          <>
            <Route path='/admin/vehicle/add' element={<><AddVehicle /></>} />
            <Route path='/admin/vehicle/update/:vid' element={<><EditVehicle /></>} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path='/user/userdash' element={<UserDash />} />
          </>
        )}


        {/* Redirect to appropriate dashboard based on user role
        <Route path='/dashboard' element={<Navigate to={isAdmin === "true" ? '/admin/vehicle/dashboard' : '/user/userdash'} />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
