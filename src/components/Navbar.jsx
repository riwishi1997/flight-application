import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="/logo.png" alt="Flight High Logo" className="logo" />
      <h1>Flight High</h1>
    </nav>
  );
};

export default Navbar;