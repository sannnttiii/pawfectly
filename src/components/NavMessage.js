import React from "react";
import { Link } from "react-router-dom";

export default function NavMessage() {
  return (
    <div>
      <nav className="fixed w-full top-0 flex flex-wrap items-center justify-between h-20 px-6 bg-white shadow-md">
        <div className="flex items-center">
          <Link to={"/homepage"}>
            <div className="transform w-full ">
              <img
                src="../images/back-arrow.svg"
                className="w-10 mr-6 "
                alt="Back"
              />
            </div>
          </Link>
          <div className=" rounded-full overflow-hidden">
            <img
              src="../images/dogpic3.jpeg"
              className="w-12 h-12 mr-0"
              alt="Profile"
            />
          </div>
          <h1 className="text-xl font-medium ml-4 ">Bara, 2th</h1>
        </div>
      </nav>
    </div>
  );
}
