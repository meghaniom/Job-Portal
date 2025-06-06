import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

import JobListings from './pages/Joblist';

import Header from './Header/Header';
import FirstPage from './component/HomePage';
import './App.css'



const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<FirstPage/>} />
        <Route path="/jobs" element={<JobListings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
