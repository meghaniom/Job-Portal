import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const jobsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://remotive.com/api/remote-jobs?category=software-dev"
        );
        const json = await response.json();
        setJobs(json.jobs);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    try {
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(saved);
  } catch (e) {
    console.error("Invalid JSON in savedJobs:", e);
    localStorage.removeItem("savedJobs");
    setSavedJobs([]);
  }

    fetchData();
  }, []);

  const toggleSaveJob = (job) => {
    let updated = [];
     const exist = savedJobs.find(j => j.id  === job.id);
      if (exist) {
        updated = savedJobs.filter((j) => j.id !== job.id);
      }
      else {
        updated = [...savedJobs, job];
      }
       setSavedJobs(updated);
       localStorage.setItem("savedJobs", JSON.stringify(updated));
  }

  // Filter jobs based on search and dropdown
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = jobTypeFilter
      ? job.job_type.toLowerCase() === jobTypeFilter.toLowerCase()
      : true;
    return matchesSearch && matchesType;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Remote Software Development Jobs
      </h2>
      
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      <div className="mb-4">
        <Link to="/saved" className="text-blue-600 underline">View Saved Jobs →</Link>
      </div>
      

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or company..."
          className="p-2 border border-gray-300 rounded w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="p-2 border border-gray-300 rounded mt-2 sm:mt-0"
          value={jobTypeFilter}
          onChange={(e) => {
            setJobTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Job Types</option>
          <option value="full_time">Full-Time</option>
          <option value="part_time">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="freelance">Freelancer</option>
        </select>
      </div>

      {/* Job Table */}
      {error ? (
        <p className="text-red-500">
          The remote jobs are not available right now.
        </p>
      ) : loading ? (
        <p className="text-gray-600">Loading jobs...</p>
      ) : (
        <>
          {filteredJobs.length === 0 ? (
            <p className="text-gray-600">No jobs found.</p>
          ) : (
            <>
             <div className="overflow-x-auto rounded-lg shadow-md">
  <table className="min-w-full bg-white border border-gray-200">
    <thead className="bg-blue-600 text-white">
      <tr>
        <th className="py-3 px-6 text-left">Job Title</th>
        <th className="py-3 px-6 text-left">Company</th>
        <th className="py-3 px-6 text-left">Location</th>
        <th className="py-3 px-6 text-left">Type</th>
        <th className="py-3 px-6 text-left">Actions</th>
        <th className="py-3 px-6 text-left">SaveJob</th>
        
      </tr>
    </thead>
    <tbody>
      {currentJobs.map((job, index) => (
        <tr
          key={job.id}
          className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
        >
          <td className="py-4 px-6 font-medium text-gray-800">{job.title}</td>
          <td className="py-4 px-6 text-gray-700">{job.company_name}</td>
          <td className="py-4 px-6 text-gray-700">
            {job.candidate_required_location}
          </td>
          <td className="py-4 px-6 text-gray-700">{job.job_type}</td>
          <td className="py-4 px-6 space-y-2 flex flex-col sm:flex-row sm:space-x-3">
            <Link
              to={`/jobs/${job.id}`}
              className="  w-5  text-blue-600 hover:underline flex items-center"
            >
              Apply Now
            </Link>
            </td>
            <td>

           
            <button
              onClick={() => toggleSaveJob(job)}
              className={`${
                savedJobs.find((j) => j.id === job.id)
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white px-4 py-2 rounded`}
            >
              {savedJobs.find((j) => j.id === job.id) ? "Unsave" : "Save"}
            </button>
           </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


              {/* ✅ Custom Pagination UI */}
              <div className="flex justify-center mt-6 space-x-4 items-center">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded border ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100 border-gray-400"
                  }`}
                >
                  Prev
                </button>

                <span className="px-4 py-2 font-semibold bg-gray-200 rounded text-gray-800">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded border ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100 border-gray-400"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default JobListings;
