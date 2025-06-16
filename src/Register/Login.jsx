import axios from 'axios';
import React, { useState } from 'react'
// import { BiLogoHeroku } from 'react-icons/bi';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword]  = useState('');
     const [showPassward, setShowPassword] = useState(false);
     const login = localStorage.getItem('token');
     
     if (login) {
      console.log('dtgrdfyhtf')
      navigate('/firstPage');
     }

     const handelSubmit = () => {
        const payload = {
            email : email,
            password: password
        }
       
        
     
      axios.post('https://api.escuelajs.co/api/v1/auth/login', payload)
      .then ((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.access_token));
        alert("Login Successfully");
        console.log("Login Successfully",res);
         navigate ('/firstPage')
      })
      .catch((err) => {
        alert("Login Failed");
        console.log("Login Failed",err);
        navigate('/notefound')
        
      })
     }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200">
      <div className="bg-white space-y-5 p-8 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="font-bold text-2xl text-center text-blue-700">Login</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2 relative">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassward ? "text" : "password"}
            value={password}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
         <span onClick={()=> setShowPassword(!showPassward)} className='absolute right-3 top-[38px] text-gray-600 cursor-pointer'>
                {showPassward ? <FiEyeOff />: <FiEye />}
         </span>
        </div>

        <button
          onClick={handelSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login