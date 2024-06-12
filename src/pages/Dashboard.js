import React, { Fragment } from "react";
import Navbar from "../components/Navbar";
import Login from "./Login";

function Dashboard() {
  return (
    <div>
      <Navbar></Navbar>
      {/* <div className="bg-orange-400 min-h-screen"></div> */}
      <section class="h-screen bg-orange-400 flex items-center justify-center">
        <div class="columns-2">
          <img
            className="w-full h-auto justify-center items-center"
            src="../images/bg-dashboard-1.png"
            alt="Left Image"
          />
          <img
            className="w-full  h-auto justify-center items-center"
            src="../images/bg-dashboard-2.png"
            alt="Right Image"
          />
        </div>
      </section>

      <section class="flex-grow bg-white">
        <div class="container mx-auto px-6 py-12">
          <h2 class="text-4xl font-bold text-center ">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid:cols-2 lg:grid-cols-3">
            <div className="rounded-xl shadow-lg mr-4 mb-4">
              <div className="p-4 flex flex-col">
                <div class="p-4 text-3xl font-bold text-center border-b-4">
                  <img
                    class="w-30 h-28 rounded-full mx-auto py-0 my-2"
                    src="../images/testi1.jpeg"
                    alt="testi1"
                  />
                  Haruka
                </div>
                <ul class="w-full text-center text-sm">
                  <li class="border-b py-4 px-4">
                    I can't thank Pawfectly enough for helping me find the
                    perfect match for my energetic pup. Haruka is now a happy
                    and playful member of our family!
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl shadow-lg mr-4 mb-4">
              <div className="p-5 flex flex-col">
                <div class="p-4 text-3xl font-bold text-center border-b-4">
                  <img
                    class="w-30 h-28 rounded-full mx-auto py-0 my-2"
                    src="../images/testi3.jpeg"
                    alt="testi3"
                  />
                  Oddy
                </div>
                <ul class="w-full text-center text-sm">
                  <li class="border-b py-4 px-4">
                    Thanks to Pawfectly, I found the purrfect companion for my
                    lonely cat. Now, Oddy is happier than ever with their new
                    feline friend!
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl shadow-lg mr-4 mb-4">
              <div className="p-5 flex flex-col">
                <div class="p-4 text-3xl font-bold text-center border-b-4">
                  <img
                    class="w-30 h-28 rounded-full mx-auto py-0 my-2"
                    src="../images/testi2.jpeg"
                    alt="testi2"
                  />
                  Hachi
                </div>
                <ul class="w-full text-center text-sm">
                  <li class="border-b py-4 px-4">
                    Pawfectly, you've got a loyal user in me! Hachi is happier
                    and found his soulmate from Pawfectly App!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
