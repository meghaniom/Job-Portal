import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch('https://remotive.com/api/remote-jobs?category=software-dev');
        const data = await response.json();
        const foundJob = data.jobs.find(job => job.id.toString() === id);
        setJob(foundJob);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <p className="p-6 text-gray-600">Loading job details...</p>;
  if (!job) return <p className="p-6 text-red-500">Job not found.</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{job.company_name}</p>
        <p className="text-gray-700 mb-2"><strong>Location:</strong> {job.candidate_required_location}</p>
        <p className="text-gray-700 mb-4"><strong>Job Type:</strong> {job.job_type}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Job Description</h2>
        <div
          className="prose max-w-full text-gray-700"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />

        <div className="mt-6">
          <Link to="/jobs" className="text-blue-500 hover:underline">← Back to Job Listings</Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
