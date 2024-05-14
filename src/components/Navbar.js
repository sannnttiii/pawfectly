import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between h-20 px-6 shadow-md">
      <Link to={"/"}>
        <img src="../images/logo-raw.png" className="w-48 h-20" alt="Logo" />
      </Link>
      {/* <img
        src="../images/profile-icon.png"
        className="w-12 h-12 "
        alt="Profile Icon"
      /> */}
      <Link
        to={"/login"}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        <button>Login</button>
      </Link>
    </nav>
  );
}
