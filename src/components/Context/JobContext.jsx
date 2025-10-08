import React, { createContext, useState, useEffect } from "react";

export const JobContext = createContext();

export default function JobProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "Google",
      position: "Frontend Developer",
      location: "USA",
      dateApplied: "2023-01-01",
      status: "Pending",
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Backend Developer",
      location: "UK",
      dateApplied: "2023-02-01",
      status: "Interview",
    },
    {
      id: 3,
      company: "Microsoft",
      position: "Data Analyst",
      location: "SU",
      dateApplied: "2025-02-01",
      status: "Interview",
    },
    {
      id: 4,
      company: "Microsoft",
      position: "Ai engineer",
      location: "UK",
      dateApplied: "2025-02-01",
      status: "Interview",
    },
  ]);

  // تحميل من localStorage
  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
    setLoading(false);
  }, []);

  // حفظ في localStorage
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // الوظائف
  const addJob = (job) => {
    setJobs((prev) => [...prev, job]);
  };

  const updateJob = (updatedJob) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const getJobById = (id) => {
    return jobs.find((job) => job.id === parseInt(id));
  };

  return (
    <JobContext.Provider
      value={{ jobs, addJob, updateJob, deleteJob, getJobById, loading }}
    >
      {children}
    </JobContext.Provider>
  );
}
