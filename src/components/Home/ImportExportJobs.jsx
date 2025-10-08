import React from "react";

export default function ImportExportJobs() {
  const handleExport = () => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const dataStr = JSON.stringify(jobs, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "jobs-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedJobs = JSON.parse(event.target.result);
        if (Array.isArray(importedJobs)) {
          localStorage.setItem("jobs", JSON.stringify(importedJobs));
          window.location.reload();
        } else {
          alert("Invalid file format. Please upload a valid JSON file.");
        }
      } catch (err) {
        alert("Error reading file. Make sure it's a valid JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-row gap-3 items-end">
      <button
        onClick={handleExport}
        className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
      >
        Export Jobs to JSON
      </button>

      <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
        Import Jobs from JSON
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
}
