






import React, { useContext, useState } from "react";
import { JobContext } from "../Context/JobContext";
import { SavedJobsContext } from "../Context/SavedJobsContext";
import { Link } from "react-router-dom";
import ImportExportJobs from "../Home/importExportJobs"; // ← الاستيراد

export default function Home() {
  const { jobs } = useContext(JobContext);
  const { handleToggleSaveJob } = useContext(SavedJobsContext);
  const [searchValue, setSearchValue] = useState("");

  const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

  const isJobSaved = (id) => {
    return savedJobs.some((job) => job.id === id);
  };

  function countStatus(status) {
    return jobs.filter((job) => job.status.toLowerCase() === status).length;
  }

  const filteredJobs = jobs.filter((job) =>
    job.status.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto ">
      <ImportExportJobs /> 
      <h1 className="text-3xl font-bold mb-6 text-center text-black mt-20 ">
        Job Applications Summary
      </h1>
      
    
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center text-white">
            <div className="bg-yellow-400 py-3 rounded shadow">
              Pending: {countStatus("pending")}
            </div>
            <div className="bg-blue-500 py-3 rounded shadow">
              Interview: {countStatus("interview")}
            </div>
            <div className="bg-green-500 py-3 rounded shadow">
              Offer: {countStatus("offer")}
            </div>
            <div className="bg-red-500 py-3 rounded shadow">
              Rejected: {countStatus("rejected")}
            </div>
          </div>
    
          <input
            type="search"
            placeholder="Search by status..."
            className="border border-gray-300 rounded px-4 py-2 w-full mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
    
          {filteredJobs.length === 0 ? (
            <h2 className="text-center text-gray-500">No jobs match your search</h2>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="border p-5 rounded shadow-md bg-white hover:shadow-lg transition duration-300 relative"
                >
                  {/* Bookmark Icon in top-right */}
                  <button
                    onClick={() => handleToggleSaveJob(job)}
                    className="absolute top-3 right-3"
                  >
                    {isJobSaved(job.id) ? (
                      <svg
                        className="w-6 h-6 text-red-500 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 3a2 2 0 00-2 2v14l7-4 7 4V5a2 2 0 00-2-2H5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-400 hover:text-red-500 transition"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z"
                        />
                      </svg>
                    )}
                  </button>
    
                  {/* Job Info */}
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {job.position}
                  </h2>
                  <p className="text-gray-600">Company: {job.company}</p>
                  <p className="text-gray-600">Location: {job.location}</p>
                  <p className="text-gray-600">Date Applied: {job.dateApplied}</p>
                  <p className="text-gray-600 mb-4">
                    Status:{" "}
                    <span className="font-semibold capitalize text-indigo-600">
                      {job.status}
                    </span>
                  </p>
                  <div className="text-center">
                    <Link to={`/job/${job.id}`}>
                      <button className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
  

  );
}
