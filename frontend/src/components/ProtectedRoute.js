import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
    const user = JSON.parse(localStorage.getItem("user"));
    return children;
}
