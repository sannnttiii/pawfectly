import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex w-full h-screen bg-gray-200">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray">
          <h1 className="text-4xl font-semibold">Welcome!</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Please enter your details below to sign up.
          </p>
          <div className="mt-8">
            <label className="text-lg font-medium">Email</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-1">
            <label className="text-lg font-medium">Password</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="mt-1">
            <label className="text-lg font-medium">Confirm Password</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="mt-8 flex flex-col gap-y-4">
            <Link to={"/homepage"}>
              <button className=" w-full bg-orange-500 text-white text-lg font-bold py-3 rounded-xl hover:bg-orange-700">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 lg:flex h-full w-1/2 hidden relative items-center justify-center">
        <div className="w-60 h-60 bg-gradient-to-tr from-orange-500 to-yellow-500 rounded-full animate-bounce"></div>
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
      </div>
    </div>
  );
}
