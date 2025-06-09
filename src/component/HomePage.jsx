import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const FirstPage = () => {
  return (
    <>
   <Header/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 max-w-4xl w-full mx-4 text-center transform transition-all duration-500 hover:shadow-3xl">
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 animate-fadeIn">
            Welcome to <span className="text-blue-600">JobPortal</span>
          </h1>
          <div className="w-24 h-2 bg-blue-500 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-2">
            Your gateway to <span className="font-medium text-blue-600">exceptional career opportunities</span>
          </p>
        </div>

        <div className="space-y-6 mb-12">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600 text-left text-base sm:text-lg">
              Discover thousands of curated job listings from top companies
            </p>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600 text-left text-base sm:text-lg">
              Advanced filters to find your perfect role in seconds
            </p>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600 text-left text-base sm:text-lg">
              One-click application process with smart recommendations
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/jobs"
            className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Browse Jobs
          </Link>
          <Link
            to="/register"
            className="px-8 py-3.5 border-2 border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-all duration-300"
          >
            Create Account
          </Link>
        </div>

        <p className="text-gray-500 text-sm mt-8">
          Join over 50,000 professionals who found their dream jobs through us
        </p>
      </div>
    </div>
     </>
  );
};

export default FirstPage;