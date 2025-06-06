import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between font-sans">
        <h1 className="text-3xl font-extrabold text-white tracking-wide select-none">
          Job Portal
        </h1>
        <nav className="space-x-8">
          <Link
            to="/"
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
