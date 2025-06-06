import React, { useEffect, useState } from 'react';

const JobListings = () => {
   const [data, setData] = useState();

    useEffect(() => {
      const fetchData = async() => {
        const response = await fetch ('https://remotive.com/api/remote-jobs?category=software-dev');
        const json = await response.json();
        setData(json);
      }
      fetchData();


      }
    },[])
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Listings</h2>
      {/* Add job cards or a list here */}
      <p className="text-gray-600">Here are the latest job openings for you!</p>
    </div>
  );
};

export default JobListings;
