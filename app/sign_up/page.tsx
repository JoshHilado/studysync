"use client";

import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
      </head>
      <div className="bg-[#F0EDCC] min-h-screen flex flex-col justify-center items-center relative">
        {/* StudySync Title */}
        <div className="absolute top-[18%] font-black text-[#02343F] text-5xl">
          StudySync
        </div>

        {/* Form Container */}
        <div className="absolute top-[38%] flex flex-col items-center space-y-6">
          {/* Name Box */}
          <input
            type="text"
            placeholder="Full Name"
            className="font-[Poppins] text-2xl text-[#02343F] w-96 bg-white rounded-lg p-4 shadow-lg text-center"
          />

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

          {/* Sign Up Button */}
          <button
            className="font-[Poppins] text-2xl text-[#F0EDCC] w-32 bg-[#02343F] rounded-lg p-2 shadow-lg mt-10"
            onClick={() => router.push("/")} //Route to Sign In
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}
