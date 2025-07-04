import React, { useEffect, useState } from "react";
import API from "../api/api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await API.get("/feedback"); // Must populate userId on backend
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const approve = async (id) => {
    if (window.confirm("Approve this feedback?")) {
      await API.put(`/admin/feedback/${id}/approval`, { status: "approved" });
      fetchFeedbacks();
    }
  };

  const reject = async (id) => {
    if (window.confirm("Reject this feedback?")) {
      await API.put(`/admin/feedback/${id}/approval`, { status: "rejected" });
      fetchFeedbacks();
    }
  };

  const downloadCSV = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) {
      alert("You must be logged in as admin to download feedback.");
      return;
    }

    try {
      const response = await API.get("/admin/feedback/export", {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "feedbacks.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("CSV download failed", error);
      alert("Failed to download CSV. Please check your login or try again.");
    }
  };

  const filteredFeedbacks = feedbacks.filter((fb) => {
    const matchesStatus = filter === "all" || fb.approvalStatus === filter;
    const matchesSearch =
      fb.category.toLowerCase().includes(search.toLowerCase()) ||
      fb.message.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-controls">
        <input
          type="text"
          placeholder="Search by category or message"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <button className="download-btn" onClick={downloadCSV}>
          Download CSV
        </button>
      </div>

      {loading ? (
        <p>Loading feedbacks...</p>
      ) : (
        <ul className="feedback-list">
          {filteredFeedbacks.length === 0 ? (
            <p>No feedback found.</p>
          ) : (
            filteredFeedbacks.map((fb) => (
              <li key={fb._id} className="feedback-item">
                <p><strong>User:</strong> {fb.userId?.name} ({fb.userId?.email})</p>
                <p><strong>Category:</strong> {fb.category}</p>
                <p><strong>Rating:</strong> {fb.rating}</p>
                <p><strong>Message:</strong> {fb.message}</p>
                <p><strong>Status:</strong> {fb.approvalStatus}</p>
                <div className="buttons">
                  {fb.approvalStatus === "pending" && (
                    <>
                      <button className="approve-btn" onClick={() => approve(fb._id)}>Approve</button>
                      <button className="reject-btn" onClick={() => reject(fb._id)}>Reject</button>
                    </>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
