import React from "react";
import { Redirect } from "react-router-dom";


// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import { Token } from "Token";



// Dashboard
import Dashboard from "../pages/Dashboard/index";



import ProfileRoles from "../pages/Profile/Role/Roles";
import ProfileAddRoles from "../pages/Profile/Role/AddRoles";
import ProfileEditRoles from "../pages/Profile/Role/EditRoles";

import Emps from "../pages/Employee/Emp/EmpList";
import AddEmps from "../pages/Employee/Emp/AddEmp";
import EditEmp from "../pages/Employee/Emp/EditEmp";
import Sold from "../pages/Employee/Emp/Sold";



import Permission from "../pages/Profile/Role/Permission";

import SimpleCruds from "../pages/Crud/SimpleCrud/SimpleCruds";
import AddSimpleCrud from "../pages/Crud/SimpleCrud/AddSimpleCrud";
import EditSimpleCrud from "../pages/Crud/SimpleCrud/EditSimpleCrud";


const userName = Token.getName()

if(userName == 'Guest Access')
{
  var authProtectedRoutes = 
  [
   
    // Profile
    
    { path: "/roles", component: ProfileRoles },
    { path: "/add-role", component: ProfileAddRoles },
    { path: "/edit-role/:role_id", component: ProfileEditRoles },
    { path: "/permission/:role_id", component: Permission },
  
  
    // this route should be at the end of all other routes
    // eslint-disable-next-line react/display-name
    { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  
  
  ];
}
else{
  var authProtectedRoutes = [
    { path: "/dashboard", component: Dashboard },
  
    
  
  
  
  
    // Profile
    
    { path: "/roles", component: ProfileRoles },
    { path: "/add-role", component: ProfileAddRoles },
    { path: "/edit-role/:role_id", component: ProfileEditRoles },
    { path: "/permission/:role_id", component: Permission },

    // Emp Module
    
    { path: "/emp-list", component: Emps },
    { path: "/add-emp", component: AddEmps },
    { path: "/edit-emp/:emp_list_id", component: EditEmp },
    { path: "/sold/:emp_list_id", component: Sold },
    // { path: "/permission/:role_id", component: Permission },

    
   

    // Simple Crud
    
    { path: "/simple-cruds", component: SimpleCruds },
    { path: "/add-simple-crud", component: AddSimpleCrud },
    { path: "/edit-simple-crud/:simple_crud_id", component: EditSimpleCrud },
   
  
  
    // this route should be at the end of all other routes
    // eslint-disable-next-line react/display-name
    { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  
  
  ];
}

 


const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

 

];

export { authProtectedRoutes, publicRoutes };
