import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedJobs')) || [];
    setSavedJobs(stored);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Saved Jobs</h1>
      <div className="mb-4">
        <Link to="/jobs" className="text-blue-600 underline">← Back to Listings</Link>
      </div>

      {savedJobs.length === 0 ? (
        <p>No saved jobs yet.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Company</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">View</th>
            </tr>
          </thead>
          <tbody>
            {savedJobs.map(job => (
              <tr key={job.id} className="border-t">
                <td className="py-4 px-6">{job.title}</td>
                <td className="py-4 px-6">{job.company_name}</td>
                <td className="py-4 px-6">{job.candidate_required_location}</td>
                <td className="py-4 px-6">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedJobs;
