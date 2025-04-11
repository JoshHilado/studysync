"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaBell, FaHome, FaUserCircle, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";

export default function AddTask() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ subject, description, date });
  };

  // Auto-expand textarea when text overflows
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto"; // Reset height first
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`; // Expand dynamically
    }
  };

  return (
    <>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
      </head>
      <div className="flex flex-col h-screen bg-[#F0EDCC] px-4 py-6 font-[Poppins] relative">
        {/* Header */}
        <div className="flex justify-between items-center text-3xl text-[#02343F]">
          <button onClick={() => router.push("/dashboard")}> {/* Updated Route to Dashboard */}
            <FaArrowLeft className="w-8 h-8" />
          </button>
          <span className="flex-grow text-center">Add Task</span>
          <button onClick={() => router.push("/notification")}>
            <FaBell className="w-8 h-8" />
          </button>
        </div>

        {/* Task Form */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Task Name"
            className="w-full p-4 border-none rounded-lg bg-white text-[#02343F] text-lg shadow-md font-[Poppins]"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            ref={descriptionRef}
            placeholder="Task Description"
            className="w-full p-4 border-none rounded-lg bg-white text-[#02343F] text-lg shadow-md font-[Poppins] resize-none overflow-hidden"
            rows={2}
            value={description}
            onChange={handleDescriptionChange}
          />
          <input
            type="date"
            placeholder="Date"
            className="w-full p-4 border rounded-lg bg-white text-lg font-[Poppins] text-[#02343F] shadow-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit" className="w-full bg-[#02343F] text-white p-4 rounded-lg text-lg shadow-md">
            Save Task
          </button>
        </form>

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
          onClick={() => router.push("/calendar")}
          className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
            <FaCalendarAlt className="w-9 h-9" />
            <span className="text-sm">Calendar</span>
          </button>
        </div>
      </div>
    </>
  );
}
