import axios from 'axios'
import React, { useState } from 'react'
import JobListings from '../pages/Joblist'

const Profile = () => {
    const [userData,  setUserData] = useState("")
    const getProfileData = () => {

         const token =  JSON.parse(localStorage.getItem('token'));

         const  header  = {
            headers: {
                Authorization: `Bearer ${token}   `
            }
         }
        axios.get('https://api.escuelajs.co/api/v1/auth/profile',header )
        .then((res)=> {
            setUserData(res.data)
            console.log("ProfileData",res);
            
        })
        .catch((err)=> {
            alert("You are not login")
            console.log("Error Occured",err);
            
        })

    }
     const handleLogOut = () => {
        localStorage.removeItem('token');
       alert("Log Out Successfully")
     }
  return (
    <div>
        
      <JobListings/>
      
       
</div>
  )
}

export default Profile