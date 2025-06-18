import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Link, useParams } from "react-router-dom";

const Applyjob = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const allData = JSON.parse(localStorage.getItem("jobApplications") || "{}");
    setApplication(allData[id]);
  }, [id]);

  if (!application) {
    return <p className="p-8">No application found.</p>;
  }

  return (
    <>
      <Header />
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Applied Job Details</h1>
          <Link to="/jobs" className="text-blue-600 underline text-sm">
            ← Back to Listings
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-6 max-w-3xl mx-auto">
          {application.companyName && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">🏢 Company Details
              </h2>
              <p>
                <strong>Company:</strong> {application.companyName}
              </p>
              <p>
                <strong>Job Title:</strong> {application.jobTitle}
              </p>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">👤 Applicant Information</h2>
            <p>
              <strong>Name:</strong> {application.name}
            </p>
            <p>
              <strong>Email:</strong> {application.email}
            </p>
            <p>
              <strong>Phone:</strong> {application.phone}
            </p>
            <p>
              <strong>Submitted At:</strong> {application.date}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">📄 Resume</h2>
            <p className="text-blue-600">📌 {application.f}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">📝 Cover Letter</h2>
            <p className="whitespace-pre-line text-gray-700">
              {application.coverLetter}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Applyjob;
