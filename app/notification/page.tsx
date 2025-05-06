"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft, FaHome, FaUserCircle, FaCalendarAlt } from "react-icons/fa";

export default function Notifications() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-[#F0EDCC] px-4 py-6 font-[Poppins] relative">
      {/* Header */}
      <div className="flex justify-between items-center text-3xl text-[#02343F]">
        <button onClick={() => router.back()}>
          <FaArrowLeft className="w-8 h-8" />
        </button>
        <span className="flex-grow text-center font-[Poppins]">Notifications</span>
        <div className="w-8 h-8"></div>
      </div>

      {/* Centered No Notifications Message */}
      <div className="flex-grow flex items-center justify-center">
        <span className="text-[#02343F] text-4xl font-semibold">
          No Notifications
        </span>
      </div>

      {/* Navigation Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-white py-4 rounded-t-2xl shadow-lg flex items-center">
          <button 
          onClick={() => router.push("/dashboard")}
          className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
            <FaHome className="w-9 h-9" />
            <span className="text-sm">Home</span>
          </button>
          <button 
            onClick={() => router.push("/profile")}
            className="flex flex-col flex-1 items-center text-[#02343F] space-y-1"
          >
            <FaUserCircle className="w-9 h-9" />
            <span className="text-sm">Profile</span>
          </button>
          <button 
            onClick={() => router.push("/calendar")}
            className="flex flex-col flex-1 items-center text-[#02343F] space-y-1"
          >
            <FaCalendarAlt className="w-9 h-9" />
            <span className="text-sm">Calendar</span>
          </button>
        </div>
    </div>
  );
}
