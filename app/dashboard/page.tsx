"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { FaBell, FaHome, FaPen, FaUserCircle, FaCalendarAlt } from "react-icons/fa";

export default function StudySync() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
      </Head>

      <div className="flex flex-col h-screen bg-[#F0EDCC] px-4 py-6 font-[Poppins] relative">
        {/* Header */}
        <div className="flex justify-between items-center text-3xl text-[#02343F]">
          <span>StudySync</span>
          <button onClick={() => router.push("/notification")}>
            <FaBell className="w-9 h-9" />
          </button>
        </div>

        {/* Date Section */}
        <div className="flex justify-between mt-4 text-[#02343F] text-4xl">
          <span>Today</span>
          <span>{getCurrentDate()}</span>
        </div>

        {/* Task Card */}
        <div className="mt-6 bg-[#02343F] text-[#F0EDCC] flex items-center justify-center text-6xl p-16 rounded-lg relative h-120">
          {tasks.length === 0 ? "No Tasks" : tasks.map((task, index) => <p key={index}>{task}</p>)}
        </div>

        {/* Add Task Button */}
        <div className="absolute bottom-20 ml-80">
          <button 
            onClick={() => router.push("/add_tasks")}
            className="bg-[#02343F] text-white p-4 rounded-full shadow-lg mb-10"
          >
            <FaPen className="w-9 h-9" />
          </button>
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
    </>
  );
}
