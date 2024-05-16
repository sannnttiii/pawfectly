import React from "react";
import Navbar from "../components/Navbar";

function Preprofile() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-orange-400 min-h-screen">
        <div className="flex flex-col items-center">
          <h2 class="text-4xl font-bold text-center text-white mb-12 pt-20">
            Select a partner for : Dog or Cat?
          </h2>
          <div className="flex justify-center">
            <button className="w-4/12 mr-10 transform origin-center transition hover:scale-110">
              <img src="../images/dogprofile.jpeg" alt="Left Image" />
            </button>
            <button className="w-4/12 transform origin-center transition hover:scale-110">
              <img
                className="justify-center items-center"
                src="../images/catprofile.jpeg"
                alt="Right Image"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preprofile;
