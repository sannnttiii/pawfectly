import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between h-20 px-6 shadow-md">
      <Link to={"/"}>
        <div className=" transform w-full">
          <img src="../images/logo-raw.png" className="w-48 h-20" alt="Logo" />
        </div>
      </Link>
      {/* <img
        src="../images/profile-icon.png"
        className="w-12 h-12 "
        alt="Profile Icon"
      /> */}
      <Link to={"/login"}>
        <button className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-700 transform py-2 px-6 rounded-xl text-white font-semibold text-lg border-1 border-gray-100 w-full">
          Login
        </button>
      </Link>
    </nav>
  );
}
