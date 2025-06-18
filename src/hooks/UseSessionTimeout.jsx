import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UseSessionTimeout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loginTime = localStorage.getItem("loginTime");

    if (token && loginTime) {
      const currentTime = new Date().getTime();
      const timeExpired = currentTime - parseInt(loginTime);

      const timeout = 30 * 60 * 1000;
      const remainingTime = timeout - timeExpired;

      if (remainingTime <= 0) {
        logout();
      } else {
        const timer = setTimeout(logout, remainingTime);
        return () => clearTimeout(timer);
      }
    }
  }, [ ]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    
    navigate("/");
  };
};

export default UseSessionTimeout;
