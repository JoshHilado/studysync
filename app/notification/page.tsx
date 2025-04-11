'use client';

import { FaArrowLeft, FaHome, FaUserCircle, FaCalendarAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function Notifications() {
  const router = useRouter(); // Initialize router

  return (
    <>
    <head>
      <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet"/>
    </head>
    <div className="flex flex-col h-screen bg-[#F0EDCC] px-4 py-6 font-[Poppins] relative">
      {/* Back Arrow */}
      <button onClick={() => router.back()} className="w-12 h-12 flex items-center justify-center text-[#02343F]">
        <FaArrowLeft className="w-9 h-9" />
      </button>

      {/* Notifications Header */}
      <div className="mt-4 flex justify-center">
        <span className="text-4xl font-semibold text-[#02343F]">Notifications</span>
      </div>

      {/* No Notifications Message (Higher) */}
      <div className="flex flex-grow items-start justify-center mt-64">
        <span className="text-[#02343F] text-5xl font-semibold">No Notifications</span>
      </div>

      {/* Navigation Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-white py-4 rounded-t-2xl shadow-lg flex items-center">
          <button 
          onClick={() => router.push("/dashboard")}
          className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
            <FaHome className="w-9 h-9" />
            <span className="text-sm">Home</span>
          </button>
          <button className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
            <FaUserCircle className="w-9 h-9" />
            <span className="text-sm">Profile</span>
          </button>
          <button 
          onClick={() => router.push("/calendar")}  // Route to Calendar page
          className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
            <FaCalendarAlt className="w-9 h-9" />
            <span className="text-sm">Calendar</span>
          </button>
        </div>
    </div>
    </>
  );
}
