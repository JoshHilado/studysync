"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
import { FaHome, FaUserCircle, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="flex flex-col h-screen bg-[#F0EDCC] px-4 py-6 font-[Poppins] relative">
      {/* Header */}
      <div className="flex justify-between items-center text-3xl text-[#02343F]">
        <button onClick={() => router.push("/dashboard")}>
          <FaArrowLeft className="w-8 h-8" />
        </button>
        <span className="flex-grow text-center font-[Poppins]">Calendar</span>
        <div className="w-8 h-8"></div>
      </div>

      {/* Calendar */}
      <div className="bg-[#02343F] text-[#F0EDCC] w-full max-w-sm p-4 rounded-lg mx-auto mt-6">
        <h2 className="text-lg font-semibold text-center">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="grid grid-cols-7 text-center mt-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-bold">
              {day}
            </div>
          ))}
          {Array(start.getDay())
            .fill(null)
            .map((_, index) => (
              <div key={index}></div>
            ))}
          {days.map((day: Date) => (
            <div
              key={format(day, "yyyy-MM-dd")}
              className={`p-2 ${format(day, "E") === "Sun" ? "text-red-400" : "text-[#F0EDCC]"}`}
            >
              {format(day, "d")}
            </div>
          ))}
        </div>
      </div>

      {/* No Tasks Message */}
      <div className="bg-[#02343F] text-[#F0EDCC] w-full max-w-sm p-6 rounded-lg mx-auto mt-6 flex items-center justify-center text-3xl font-semibold h-24">
        No Tasks
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
        <button className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
          <FaCalendarAlt className="w-9 h-9" />
          <span className="text-sm">Calendar</span>
        </button>
      </div>
    </div>
  );
}
