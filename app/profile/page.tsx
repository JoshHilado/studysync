"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHome, FaUserCircle, FaSignOutAlt, FaCalendarAlt, FaBell } from "react-icons/fa";

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

  return (
    <div className="flex flex-col h-screen bg-[#F0EDCC] px-4 py-6 font-[Poppins] relative">
      {/* Header */}
      <div className="flex justify-between items-center text-3xl text-[#02343F]">
        <span>Settings</span>
        <button onClick={() => router.push("/notification")}> 
          <FaBell className="w-9 h-9" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="mt-6 flex flex-col items-center">
        {image ? (
          <img src={image} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <FaUserCircle className="w-12 h-12 text-white" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-2 text-sm text-[#02343F]"
        />
        <p className="text-xl font-bold mt-2 text-[#02343F]">Davon Heramis</p>
      </div>

      {/* Sign Out */}
      <div className="mt-auto px-6 pb-20">
        <button className="flex items-center text-red-600 font-semibold">
          <FaSignOutAlt className="mr-2" />
          Sign Out
        </button>
      </div>

      {/* Navigation Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-white py-4 rounded-t-2xl shadow-lg flex items-center">
        <button className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
          <FaHome className="w-9 h-9" />
          <span className="text-sm">Home</span>
        </button>
        <button className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
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
