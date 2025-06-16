import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [locationTypeFilter, setLocationTypeFilter] = useState("");

  const [visibleCount, setVisibleCount] = useState(10);

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
    const exist = savedJobs.find((j) => j.id === job.id);
    if (exist) {
      updated = savedJobs.filter((j) => j.id !== job.id);
    } else {
      updated = [...savedJobs, job];
    }
    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  const filteredJobs = jobs.filter((job) => {
    const searchMatch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase());

    const typeMatch = jobTypeFilter
      ? job.job_type.toLowerCase() === jobTypeFilter.toLowerCase()
      : true;

    const locationMatch = locationTypeFilter
      ? job.candidate_required_location.toLowerCase() ===
        locationTypeFilter.toLowerCase()
      : true;

    return searchMatch && typeMatch && locationMatch;
  });

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottom && visibleCount < filteredJobs.length) {
        setVisibleCount((prev) => prev + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredJobs.length, visibleCount]);

  const displayedJobs = filteredJobs.slice(0, visibleCount);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Remote Software Development Jobs
        </h2>

        <div className="mb-4">
          <Link to="/saved" className="text-blue-600 underline">
            View Saved Jobs →
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search by title or company..."
            className="p-2 border border-gray-300 rounded w-full sm:w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="p-2 border border-gray-300 rounded mt-2 sm:mt-0"
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
          >
            <option value="">All Job Types</option>
            <option value="full_time">Full-Time</option>
            <option value="part_time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelancer</option>
          </select>

          <select
            className="p-2 border border-gray-300 rounded mt-2 sm:mt-0"
            value={locationTypeFilter}
            onChange={(e) => setLocationTypeFilter(e.target.value)}
          >
            <option value="">All Job Location</option>
            <option value="USA">USA</option>
            <option value="Europe">Europe</option>
            <option value="Canada">Canada</option>
            <option value="India">India</option>
            <option value="Hungary">Hungary</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Argentina">Argentina</option>
          </select>
        </div>

        {/* Jobs Table */}
        {error ? (
          <p className="text-red-500">
            The remote jobs are not available right now.
          </p>
        ) : loading ? (
          <p className="text-gray-600">Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-gray-600">No jobs found.</p>
        )    : (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedJobs.map((job) => {
                const isSaved = savedJobs.find((j) => j.id === job.id);
                return (
                  <div
                    key={job.id}
                    className="bg-white border rounded-xl shadow p-5 flex flex-col justify-between hover:shadow-md transition"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {job.title}
                        </h3>
                        <button onClick={() => toggleSaveJob(job)}>
                          {isSaved ? (
                            <FaHeart className="text-red-500 text-xl" />
                          ) : (
                            <FaRegHeart className="text-gray-400 text-xl hover:text-red-500" />
                          )}
                        </button>
                      </div>

                      <p className="text-gray-700 font-medium">
                        {job.company_name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        📍 {job.candidate_required_location}
                      </p>
                      <p className="text-sm text-blue-600 mt-1 font-medium">
                        🛠 {job.job_type}
                      </p>
                    </div>

                    <Link
                      to={`/jobs/${job.id}`}
                      className="mt-4 inline-block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                      Apply Now
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default JobListings;
