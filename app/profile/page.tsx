"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHome, FaUserCircle, FaSignOutAlt, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";

export default function Profile() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignOut = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-screen bg-[#F0EDCC] px-4 py-6 font-[Poppins] relative">
      {/* Header */}
      <div className="flex justify-between items-center text-3xl text-[#02343F]">
        <button onClick={() => router.push("/dashboard")}>
          <FaArrowLeft className="w-8 h-8" />
        </button>
        <span className="flex-grow text-center font-[Poppins]">Profile</span>
        <div className="w-8 h-8" />
      </div>

      {/* Profile Section */}
      <div className="bg-[#02343F] text-[#F0EDCC] w-full max-w-sm p-6 rounded-lg mx-auto mt-6 flex flex-col items-center">
        {image ? (
          <img src={image} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
            <FaUserCircle className="w-12 h-12 text-white" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 text-sm text-[#F0EDCC]"
        />
        <p className="text-xl font-bold">Davon Heramis</p>
      </div>

      {/* Sign Out Button */}
      <div className="absolute bottom-28 left-0 w-full flex justify-center">
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-red-600 text-base font-semibold px-6 py-2 bg-white rounded-lg shadow-md"
        >
          <FaSignOutAlt className="mr-2" />
          Sign Out
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
  );
}
