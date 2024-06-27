import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Preprofile() {
  const [petTypeIsDog, setPetType] = useState(true);

  const setPetTypeAndSave = (isDog) => {
    setPetType(isDog);
    if (isDog) {
      localStorage.setItem("petType", "isDog");
    } else {
      localStorage.setItem("petType", "isCat");
    }
    console.log(localStorage.getItem("petType"));
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-orange-400 min-h-screen">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold text-center text-white mb-12 pt-20">
            Select a partner for : Dog or Cat?
          </h2>
          <Link to={"/profile"}>
            <div className="flex justify-center">
              <button
                className="w-4/12 mr-10 transform origin-center transition hover:scale-110"
                onClick={() => setPetTypeAndSave(true)}
              >
                <img src="../images/dogprofile.jpeg" alt="Left Image" />
              </button>
              <button
                className="w-4/12 transform origin-center transition hover:scale-110"
                onClick={() => setPetTypeAndSave(false)}
              >
                <img
                  className="justify-center items-center"
                  src="../images/catprofile.jpeg"
                  alt="Right Image"
                />
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Preprofile;
