import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="fixed top-0 left-0 z-50 bg-white w-full dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-black dark:text-white">
            JobTracker
          </div>

          <ul className="flex gap-6 text-sm font-medium text-black dark:text-white">
            <li>
              <Link
                to="/AllJobs"
                className="hover:text-blue-200 dark:hover:text-blue-400 transition duration-200"
              >
                Add Job
              </Link>
            </li>
            <li>
              <Link
                to="/Dashboard"
                className="hover:text-blue-200 dark:hover:text-blue-400 transition duration-200"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/Home"
                className="hover:text-blue-200 dark:hover:text-blue-400 transition duration-200"
              >
            Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

/*
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../Context/DarkModeContext";
export default function Navbar() {
  const {setIsDarkMode}=useContext(DarkModeContext);
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black border-b border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-black text-xl font-semibold">JobTracker</div>
          <button onClick={() =>setIsDarkMode(prev=>!prev)}>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z" />
</svg>

          </button>

          <ul className="flex gap-6 text-white text-sm font-medium text-black">
            <li>
              <Link
                to="/AllJobs"
                className="hover:text-blue-400 transition duration-200"
              >
                Add Job
              </Link>
            </li>
            <li>
              <Link
                to="/Dashboard"
                className="hover:text-blue-400 transition duration-200"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

*/
/*
  <div className="flex items-center justify-between gap-11">
              <button
                className="bg-gray-800 text-white p-2 rounded mr-4"
                onClick={toggleSidebar}
              >
                ☰ <span className="ml-1">Open Sidebar</span>
              </button>
            </div>
*/
