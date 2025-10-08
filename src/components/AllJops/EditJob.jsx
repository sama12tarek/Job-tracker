import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { JobContext } from "../Context/JobContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  company: z.string().min(3, "Company name is required"),
  position: z.string().min(3, "Position is required"),
  location: z.string().min(3, "Location is required"),
  dateApplied: z.string().min(4, "Date is required"),
  notes: z.string().optional(),
  status: z.enum(["pending", "interview", "offer", "rejected"]),
});

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById, updateJob } = useContext(JobContext);
  const job = getJobById(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (job) {
      reset(job); // تعبئة البيانات القديمة
    }
  }, [job, reset]);

  const onSubmit = (data) => {
    updateJob({ ...data, id: job.id });
    navigate(`/job/${job.id}`);
  };

  if (!job)
    return (
      <p className="text-center text-red-600 font-semibold mt-10">
        Job not found
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10 sm:p-14">
        <h1 className="text-2xl mb-10 text-center text-indigo-800 tracking-wide drop-shadow-md">
          Edit Job Application
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
          <div>
            <label className="block text-gray-900 font-semibold mb-3 text-lg">
              Company
            </label>
            <input
              {...register("company")}
              placeholder="Company"
              className={`w-full rounded-xl border border-gray-300 p-4 text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500
                transition-shadow duration-300 ease-in-out
                ${errors.company ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.company && (
              <p className="text-red-600 mt-2 text-sm font-medium">
                {errors.company.message}
              </p>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="block text-gray-900 font-semibold mb-3 text-lg">
              Position
            </label>
            <input
              {...register("position")}
              placeholder="Position"
              className={`w-full rounded-xl border border-gray-300 p-4 text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500
                transition-shadow duration-300 ease-in-out
                ${errors.position ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.position && (
              <p className="text-red-600 mt-2 text-sm font-medium">
                {errors.position.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-900 font-semibold mb-3 text-lg">
              Location
            </label>
            <input
              {...register("location")}
              placeholder="Location"
              className={`w-full rounded-xl border border-gray-300 p-4 text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500
                transition-shadow duration-300 ease-in-out
                ${errors.location ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.location && (
              <p className="text-red-600 mt-2 text-sm font-medium">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Date Applied */}
          <div>
            <label className="block text-gray-900 font-semibold mb-3 text-lg">
              Date Applied
            </label>
            <input
              type="date"
              {...register("dateApplied")}
              className={`w-full rounded-xl border border-gray-300 p-4 text-gray-900
                focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500
                transition-shadow duration-300 ease-in-out
                ${errors.dateApplied ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.dateApplied && (
              <p className="text-red-600 mt-2 text-sm font-medium">
                {errors.dateApplied.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-900 font-semibold mb-3 text-lg">
              Status
            </label>
            <select
              {...register("status")}
              className={`w-full rounded-xl border border-gray-300 p-4 text-gray-900
                focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500
                transition-shadow duration-300 ease-in-out
                ${errors.status ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="pending">Pending</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
            {errors.status && (
              <p className="text-red-600 mt-2 text-sm font-medium">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-900 font-semibold mb-3 text-lg">
              Notes
            </label>
            <textarea
              {...register("notes")}
              placeholder="Additional notes about the application"
              rows={5}
              className={`w-full rounded-xl border border-gray-300 p-4 text-gray-900 placeholder-gray-400 resize-none
                focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500
                transition-shadow duration-300 ease-in-out
                ${errors.notes ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.notes && (
              <p className="text-red-600 mt-2 text-sm font-medium">
                {errors.notes.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-5 mt-6">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate(`/job/${job.id}`)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/*
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { JobContext } from "../Context/JobContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  company: z.string().min(3, "Company name is required"),
  position: z.string().min(3, "Position is required"),
  location: z.string().min(3, "Location is required"),
  dateApplied: z.string().min(4, "Date is required"),
  notes: z.string().optional(),
  status: z.enum(["pending", "interview", "offer", "rejected"]),
});

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById, updateJob } = useContext(JobContext);
  const job = getJobById(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (job) {
      reset(job); // تعبئة البيانات القديمة
    }
  }, [job, reset]);

  const onSubmit = (data) => {
    updateJob({ ...data, id: job.id });
    navigate(`/job/${job.id}`);
  };

  if (!job)
    return (
      <p className="text-center text-red-500 font-semibold mt-10">
        Job not found
      </p>
    );

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Edit Job Application
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
      
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Company</label>
          <input
            className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            {...register("company")}
            placeholder="Company"
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">
              {errors.company.message}
            </p>
          )}
        </div>

      
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Position</label>
          <input
            className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            {...register("position")}
            placeholder="Position"
          />
          {errors.position && (
            <p className="text-red-500 text-sm mt-1">
              {errors.position.message}
            </p>
          )}
        </div>

      
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Location</label>
          <input
            className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            {...register("location")}
            placeholder="Location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Date Applied</label>
          <input
            type="date"
            className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            {...register("dateApplied")}
          />
          {errors.dateApplied && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateApplied.message}
            </p>
          )}
        </div>

        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Status</label>
          <select
            className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            {...register("status")}
          >
            <option value="">Select status</option>
            <option value="pending">Pending</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

    
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Notes</label>
          <textarea
            className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            {...register("notes")}
            placeholder="Additional notes about the application"
            rows={4}
          />
          {errors.notes && (
            <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>
          )}
        </div>

  
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate(`/job/${job.id}`)}
            className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

*/
