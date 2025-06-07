import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

import JobListings from './pages/Joblist';

import Header from './Header/Header';
import FirstPage from './component/HomePage';
import './App.css'
import JobDetailspage from './pages/JobDetailspage';
import SavedJob from './pages/SavedJob';



const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<FirstPage/>} />
        <Route path="/jobs" element={<JobListings />} />
        <Route  path='/jobs/:id' element={<JobDetailspage />} />
        <Route path='/saved' element = {<SavedJob/>} />
        <Route path="*" element= {<JobListings />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
