import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JobApply = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    captchaInput: "",
  });
  const navidate = useNavigate();
  const [captcha, setCaptcha] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setForm({ ...form, resume: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.captchaInput !== captcha) {
      alert("Captcha does not match. Please try again.");
      generateCaptcha();
      return;
    }

    // TODO: handle form submission
    console.log("Form submitted:", form);
    alert("Application submitted successfully!");
    generateCaptcha();
  };

  const allFieldSelected =
    form.name &&
    form.email &&
    form.phone &&
    form.resume &&
    form.coverLetter &&
    form.captchaInput;
  const handerSubmit = (e) => {
    e.preventDefault();
   
    if (!allFieldSelected) {
      alert("Please fill in all the required fields.");
      return;
    }
    alert("Application submitted successfully!");
    navidate("/jobs")
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Apply for This Job
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name, Email, Phone Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                pattern="^[a-zA-Z\s]{3,}$"
                title="Name should be at least 3 characters and contain only letters and spaces"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                title='"Please enter a valid email address'
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                pattern="^[0-9]\d{9}$"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Resume
            </label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
              required
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter
            </label>
            <textarea
              name="coverLetter"
              value={form.coverLetter}
              onChange={handleChange}
              rows="5"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* CAPTCHA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter CAPTCHA Code
            </label>
            <div className="flex items-center space-x-4 mb-2">
              <div className="bg-gray-200 text-lg font-mono px-4 py-2 rounded text-gray-800 tracking-widest select-none">
                {captcha}
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="text-blue-500 hover:underline text-sm"
              >
                Refresh
              </button>
            </div>
            <input
              type="text"
              name="captchaInput"
              value={form.captchaInput}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter CAPTCHA"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              onClick={handerSubmit}
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition duration-300"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApply;
