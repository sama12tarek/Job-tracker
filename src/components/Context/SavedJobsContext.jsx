import React, { createContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export const SavedJobsContext = createContext();

export default function SavedJobsProvider({ children }) {
  const [selectedJob, setSelectedJob] = useState(null);

  const handleToggleSaveJob = (job) => {
    let savedJobs = [];

    try {
      savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    } catch (err) {
      console.error("Error parsing jobs from localStorage", err);
    }

    const isAlreadySaved = savedJobs.some((j) => j.id === job.id);

    if (isAlreadySaved) {
  
      const updatedJobs = savedJobs.filter((j) => j.id !== job.id);
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      setSelectedJob(null);
      toast.info("Job removed from saved jobs", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
    
      const updatedJobs = [...savedJobs, job];
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      setSelectedJob(job);
      toast.success("Job saved successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <SavedJobsContext.Provider value={{ selectedJob, handleToggleSaveJob }}>
      {children}
      <ToastContainer />
    </SavedJobsContext.Provider>
  );
}
