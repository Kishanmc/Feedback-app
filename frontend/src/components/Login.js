import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("http://localhost:5000/api/users/login", formData);
      localStorage.setItem("user", JSON.stringify(res.data));
      res.data.role === "admin" ? navigate("/admin") : navigate("/user");
    } catch {
      alert("Invalid credentials or blocked");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
