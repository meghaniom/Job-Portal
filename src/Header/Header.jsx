import React from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    alert("Log Out Successfully");
    navigate("/");
  };
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-800 to-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between font-sans">
        <div className="flex items-center space-x-4">
          <img src={image} alt="logo" className="w-12 h-12 object-contain" />
          <h1 className="text-xl font-bold text-white tracking-wide select-none">
            Job Portal
          </h1>
        </div>

        <nav className="space-x-8">
          <Link
            to="/firstpage"
            className="text-white text-lg font-semibold hover:underline hover:underline-offset-4 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="text-white text-lg font-semibold hover:underline hover:underline-offset-4 transition duration-300"
          >
            Job Listings
          </Link>
          <button
            className="bg-orange-500 hover:bg-gray-700 hover: text-white px-4 py-1"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
