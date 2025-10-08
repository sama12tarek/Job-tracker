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

          
          </ul>
        </div>
      </div>
    </nav>
  );
}

