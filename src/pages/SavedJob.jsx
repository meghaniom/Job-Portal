import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(stored);
  }, []);

  return (
    <>
      <Header />
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Saved Jobs</h1>
        <div className="mb-4">
          <Link to="/jobs" className="text-blue-600 underline">
            ← Back to Listings
          </Link>
        </div>
        {savedJobs.length === 0 ? (
          <p>No saved jobs yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border rounded-xl shadow p-5 flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {job.title}
                  </h3>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mt-2">
                    <div className="flex flex-col">
                      <p className="text-gray-700 font-medium">
                        {job.company_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        📍 {job.candidate_required_location}
                      </p>
                      <p className="text-sm text-blue-600 font-medium">
                        🛠 {job.job_type}
                      </p>
                    </div>

                    <div className="mt-2 lg:mt-0">
                      <Link
                        to={`/jobs/details/${job.id}`}
                        className="text-blue-600 underline font-medium"
                      >
                        Apply Job
                      </Link>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/jobs/${job.id}`}
                  className="mt-4 text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  View Job
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SavedJobs;
