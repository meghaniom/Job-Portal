import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

const AllApplications = () => {
  const [applications, setApplications] = useState({});


  useEffect(() => {
    const allData = JSON.parse(localStorage.getItem("jobApplications") || "{}");
    setApplications(allData);
  }, []);

  return (
    <>
      <Header />
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">All Job Applications</h1>

        {Object.keys(applications).length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="space-y-6">
            {Object.entries(applications).map(([id, app]) => (
              <div
                key={id}
                className="bg-white p-6 rounded-md shadow-md max-w-3xl mx-auto"
              >
                <h2 className="text-xl font-semibold">{app.name}</h2>
                <p>
                  <strong>Email:</strong> {app.email}
                </p>
                <p>
                  <strong>Phone:</strong> {app.phone}
                </p>
                <p>
                  <strong>Company:</strong> {app.companyName}
                </p>
                <p>
                  <strong>Job Title:</strong> {app.jobTitle}
                </p>
                <p>
                  <strong>Date Applied:</strong> {app.date}
                </p>

                <Link
                  to={`/jobs/${id}`}
                  className="text-blue-600 underline text-sm block mt-2"
                >
                  View Full Application →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllApplications;
