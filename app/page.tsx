"use client";

import { useRouter } from "next/navigation"; // Import useRouter
import Image from "next/image";

export default function Home() {
  const router = useRouter(); // Initialize router

  return (
    <>
      <div className="bg-[#F0EDCC] min-h-screen flex flex-col justify-center items-center relative">
        {/* StudySync Title */}
        <div className="absolute top-[18%] font-black text-[#02343F] text-5xl">
          StudySync
        </div>

        {/* Form Container */}
        <div className="absolute top-[42%] flex flex-col items-center space-y-6">
          {/* Email Box */}
          <input
            type="email"
            placeholder="Email"
            className="font-[Poppins] text-2xl text-[#02343F] w-96 bg-white rounded-lg p-4 shadow-lg text-center"
          />

          {/* Password Box */}
          <input
            type="password"
            placeholder="Password"
            className="font-[Poppins] text-2xl text-[#02343F] w-96 bg-white rounded-lg p-4 shadow-lg text-center"
          />

          {/* Log In Button */}
          <button
            className="font-[Poppins] text-2xl text-[#F0EDCC] w-32 bg-[#02343F] rounded-lg p-2 shadow-lg mt-10"
            onClick={() => router.push("/dashboard")} // Redirect to dashboard
          >
            Log In
          </button>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-[10%] flex flex-col items-center space-y-2">
          {/* Question */}
          <div className="font-[Poppins] text-xl text-black">
            Don't have an account?
          </div>

          {/* Sign Up */}
          <div className="font-[Poppins] font-bold text-xl text-[#3619B8]">
            Sign Up
          </div>
        </div>
      </div>
    </>
  );
}
