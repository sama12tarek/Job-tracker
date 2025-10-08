import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JobContext } from "../Context/JobContext";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getJobById, deleteJob } = useContext(JobContext);
  const job = getJobById(id);

  if (!job) return <p className="text-center mt-10">Job not found</p>;

  // 🗑️ دالة حذف الوظيفة
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );
    if (confirmDelete) {
      deleteJob(job.id);
      navigate("/Job-tracker/"); // رجوع للصفحة الرئيسية بعد الحذف
    }
  };

  const handleEdit = () => {
    navigate(`/Job-tracker/edit/${job.id}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-sky-400 shadow-md rounded mt-20 ">
      <h2 className="text-2xl font-bold mb-4">{job.position}</h2>
      <p className="mb-2">
        <strong>Company:</strong> {job.company}
      </p>
      <p className="mb-2">
        <strong>Location:</strong> {job.location}
      </p>
      <p className="mb-2">
        <strong>Status:</strong> {job.status}
      </p>
      <p className="mb-2">
        <strong>Date Applied:</strong> {job.dateApplied}
      </p>
      {job.notes && (
        <p className="mb-2">
          <strong>Notes:</strong> {job.notes}
        </p>
      )}

      {/* 🧩 أزرار التعديل والحذف */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleEdit}
          className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
