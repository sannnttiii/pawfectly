import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
// import { FaHeart } from "react-icons/fa";

function Homepage() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center min-h-screen container mx-auto">
        <div className="grid grid-cols-1 md:grid:cols-2 lg:grid-cols-3">
          <div className="rounded-xl shadow-lg mr-4 mb-4">
            <div className="p-5 flex flex-col">
              <div className="rounded-xl over">
                <img
                  src="../images/dogpic.jpeg"
                  // className="w-48 h-20"
                  alt="Logo"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-medium mt-3">
                Diego, 2th
              </h3>
              <div className="flex justify-between items-stretch text-sm text-slate-600">
                <p>Surabaya</p> <p>Other</p>
              </div>
              <p className="text-slate-500 mt-3">
                Lorem ipsum dia suka main bola mandi bole umur 2 tahun nih cari
                yang seumuran dan seras ya hihihiiiihihihhi
              </p>
            </div>
            <div class="m-auto mb-4 mt-0 flex justify-center">
              <button className="w-14 h-14 mr-4 transition hover:scale-110 ">
                <img
                  src="../images/love.svg"
                  alt="Love Icon"
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
              <button className="w-14 h-14  transition hover:scale-110">
                <img
                  src="../images/cancel.svg"
                  alt="Cancel Icon"
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
            </div>
          </div>
          <div className="rounded-xl shadow-lg mr-4 mb-4">
            <div className="p-5 flex flex-col">
              <div className="rounded-xl over ">
                <img src="../images/dogpic2.jpeg" className="" alt="Logo" />
              </div>
              <h3 className="text-2xl md:text-3xl font-medium mt-3">
                Harby, 2th
              </h3>
              <div className="flex justify-between items-stretch text-sm text-slate-600">
                <p>Surabaya</p> <p>Other</p>
              </div>
              <p className="text-slate-500 mt-3">
                Suka bermain dan telinga kelinci, he's playful and will protect
                friend
              </p>
            </div>
            <div class="m-auto mb-4 mt-0 flex justify-center">
              <button className="w-14 h-14 mr-4 transition hover:scale-110 ">
                <img
                  src="../images/love.svg"
                  alt="Love Icon"
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
              <button className="w-14 h-14  transition hover:scale-110">
                <img
                  src="../images/cancel.svg"
                  alt="Cancel Icon"
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
            </div>
          </div>
          <div className="rounded-xl shadow-lg mr-4 mb-4">
            <div className="p-5 flex flex-col">
              <div className="rounded-xl over ">
                <img
                  src="../images/dogpic3.jpeg"
                  className="w-full h-87"
                  alt="Logo"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-medium mt-3">
                Bara, 2th
              </h3>
              <div className="flex justify-between items-stretch text-sm text-slate-600">
                <p>Surabaya</p> <p>Other</p>
              </div>
              <p className="text-slate-500 mt-3">
                Bola kesukaannya, hanya suka dielus jika sedang tidur karena
                sisanya dia yang minta
              </p>
            </div>
            <div class="m-auto mb-4 mt-0 flex justify-center">
              <Link to={"/message"}>
                <button className="flex w-14 h-14 mr-4 transition hover:scale-110 transform">
                  <img
                    src="../images/love.svg"
                    alt="Love Icon"
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>
              </Link>

              <button className="w-14 h-14  transition hover:scale-110">
                <img
                  src="../images/cancel.svg"
                  alt="Cancel Icon"
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
