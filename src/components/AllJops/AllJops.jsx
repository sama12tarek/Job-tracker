import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobContext } from "../Context/JobContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  company: z.string().min(3, "Company name is required"),
  position: z.string().min(3, "Position is required"),
  location: z.string().min(3, "Location is required"),
  dateApplied: z.string().min(4, "Date is required"),
  notes: z.string().optional(),
  status: z.enum(["pending", "interview", "offer", "rejected"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});

export default function AllJobs() {
  const navigate = useNavigate();
  const { addJob } = useContext(JobContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      company: "",
      position: "",
      location: "",
      dateApplied: "",
      status: "",
      notes: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    addJob({ ...data, id: Date.now() });
    toast.success("Job added successfully!");
    setTimeout(() => {
      navigate("/Dashboard");
    }, 1000);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-center text-sky-600 mb-8">
          Add a Job Application
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block mb-1 font-medium">Company Name</label>
            <input
              type="text"
              {...register("company")}
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="Company name"
            />
            {errors.company && (
              <p className="text-red-600 text-sm mt-1">
                {errors.company.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Position</label>
            <input
              type="text"
              {...register("position")}
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="Position"
            />
            {errors.position && (
              <p className="text-red-600 text-sm mt-1">
                {errors.position.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              {...register("location")}
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="Location"
            />
            {errors.location && (
              <p className="text-red-600 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              {...register("status")}
              className="w-full border border-gray-300 rounded-md p-3"
            >
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
            {errors.status && (
              <p className="text-red-600 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Date Applied</label>
            <input
              type="date"
              {...register("dateApplied")}
              className="w-full border border-gray-300 rounded-md p-3"
            />
            {errors.dateApplied && (
              <p className="text-red-600 text-sm mt-1">
                {errors.dateApplied.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Notes</label>
            <textarea
              {...register("notes")}
              className="w-full border border-gray-300 rounded-md p-3 resize-none h-28"
              placeholder="Optional notes about the job..."
            />
          </div>

          <div className="md:col-span-2 flex justify-center gap-6 pt-4">
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            >
              Save Application
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-6 rounded-md transition duration-200"
              onClick={() => reset()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

