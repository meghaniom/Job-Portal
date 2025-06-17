import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const JobApply = () => {
  const [form, setForm] = useState({
    name: "",

    resume: null,
    coverLetter: "",
    captchaInput: "",
  });
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navidate = useNavigate();
  const [captcha, setCaptcha] = useState("");
  const[emailError, setEmailError] =  useState("");
  const [phoneError, setPhoneError] = useState("");
  const { id } = useParams();
 

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
    console.log("Form submitted:", form);
    alert("Application submitted successfully!");
    generateCaptcha();
  };

  const allFieldSelected =
    form.name &&
    email &&
    phone &&
    form.resume &&
    form.coverLetter &&
    form.captchaInput;

  const handerSubmit = (e) => {
    e.preventDefault();

    if (!allFieldSelected) {
      alert("Please fill in all the required fields.");
      return;
    }

    const submission = {
      ...form,
      email,
      phone,
      resumeName: form.resume?.name || "Not uploaded",
      jobId: id,
      date: new Date().toLocaleString(),
    };

    const existing = JSON.parse(
      localStorage.getItem("jobApplications") || "{}"
    );
    existing[id] = submission;

    localStorage.setItem("jobApplications", JSON.stringify(existing));
    alert("Application submitted successfully!");

    navidate(`/apply/${id}`);
    console.log("Application submitted:", submission);
  };

  const handelPhonechange = (value) => {
    const cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue.length > 10) return;
    setPhone(cleanedValue);

    if (cleanedValue.length !== 10) {
     setPhoneError("Phone number must be  exactly 10 degits.");
    } else {
     setPhoneError(" ");
    }
  };

const handelEmailChange = (value) => {
  const trimmedValue = value.replace(/\s/g, "");
  setEmail(trimmedValue); 

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  if (emailRegex.test(trimmedValue)) {
  setEmailError("");
  } else {
    setEmailError("Please enter a valid email address."); 
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Apply for This Job
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
        
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
                value={email}
                onChange={(e) => handelEmailChange(e.target.value)}
                required
                title='"Please enter a valid email address'
                
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {emailError && <p className="text-red-500 text-sm mt-1"> {emailError}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => handelPhonechange(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
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
              download="resume.pdf"
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
