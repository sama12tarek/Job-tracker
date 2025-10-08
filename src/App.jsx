import "./App.css";
import React from "react";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllJops from "./components/AllJops/AllJops";
import ProjectDetails from "./components/AllJops/ProjectDetails";
import JobProvider from "../src/components/Context/JobContext";
import { ToastContainer } from "react-toastify";
import EditJob from "./components/AllJops/EditJob";
import SavedJobsContextProvider from "./components/Context/SavedJobsContext";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "Job-tracker",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "AllJobs", element: <AllJops /> },
        { path: "Dashboard", element: <Dashboard /> },
        { path: "job/:id", element: <ProjectDetails /> },
        { path: "edit/:id", element: <EditJob /> },
      ],
    },
  ]);

  return (
    <JobProvider>
      <SavedJobsContextProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </SavedJobsContextProvider>
    </JobProvider>
  );
}

export default App;
