import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import JobListings from './pages/Joblist';

import FirstPage from './component/HomePage';
import JobDetailspage from './pages/JobDetailspage';
import SavedJob from './pages/SavedJob';
import Login from './Register/Login';
import NotFound from './Register/NotFound';
import './App.css';

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
      {!isLoginPage && isLoggedIn  }


      <Routes>
        <Route path="/" element={<Login />} />

        {isLoggedIn ? (
          <>
            <Route path="/firstpage" element={<FirstPage />} />
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/jobs/:id" element={<JobDetailspage />} />
            <Route path="/saved" element={<SavedJob />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            {/* Not logged in: allow only `/`, and show NotFound for others */}
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppLayout;
