import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const styles = {
    nav: {
      background: "#343a40",
      padding: "12px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      color: "white",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontWeight: "bold",
    },
    button: {
      background: "transparent",
      color: "white",
      border: "1px solid white",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>
        Home
      </Link>
      {user ? (
        <button onClick={logout} style={styles.button}>
          Logout
        </button>
      ) : (
        <>
          <Link to="/register" style={styles.link}>
            Register
          </Link>
          <Link to="/" style={styles.link}>
            Login
          </Link>
        </>
      )}
    </nav>
  );
}
