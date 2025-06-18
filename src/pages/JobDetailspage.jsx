import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          "https://remotive.com/api/remote-jobs?category=software-dev"
        );
        const data = await response.json();
        const foundJob = data.jobs.find((job) => job.id.toString() === id);
        if (foundJob) {
          setJob(foundJob);
        } else {
          alert("Job are not Found");
          navigate("/jobs");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, navigate]);

  if (loading)
    return <p className="p-6 text-gray-600">Loading job details...</p>;
  if (!job) return <p className="p-6 text-red-500">Job not found.</p>;

  const cleanDescription = job.description.replace(
    /<img[^>]*blank\.gif[^>]*>/gi,
    ""
  );

  return (
    <>
      <Header />
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{job.company_name}</p>
          <p className="text-gray-700 mb-2">
            <strong>Location:</strong> {job.candidate_required_location}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Job Type:</strong> {job.job_type}
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
            Job Description
          </h2>
          <div
            className="prose max-w-full text-gray-700"
            dangerouslySetInnerHTML={{ __html: cleanDescription }}
          />
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Apply on Website
          </a>
          <div className="flex justify-space-between w-full items-center align-middle ">
            <div className="mt-6  w-full">
              <Link to="/jobs" className="text-blue-500 hover:underline">
                ← Back to Job Listings
              </Link>
            </div>
            <div className="mt-6 w-full text-right">
              <Link
                to={`/jobs/details/${job.id}`}
                className="text-blue-500 hover:underline"
              >
                {" "}
                Jobs Apply ➜
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
