import React from 'react'

import { Navigate, useNavigate } from 'react-router-dom';


const ProjectedRouter = ({ children }) => {
     const token =  localStorage.getItem('token');
   
      
// children to login, user, logout
 const navigate = useNavigate();
      if (!token) {
       return <navigate to="/" />;
      }
   return  children;
}

export default ProjectedRouter;