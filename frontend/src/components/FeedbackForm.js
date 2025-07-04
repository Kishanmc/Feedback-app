import React, { useState } from "react";
import API from "../api/api";
import "./FeedbackForm.css";

export default function FeedbackForm() {
  const [form, setForm] = useState({
    category: "",
    message: "",
    rating: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("http://localhost:5000/api/feedback", form);
    alert("Feedback submitted");
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <input
        name="rating"
        type="number"
        placeholder="Rating (1-5)"
        value={form.rating}
        onChange={handleChange}
        min="1"
        max="5"
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        rows="4"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
