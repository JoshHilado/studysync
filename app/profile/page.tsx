'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { FaHome, FaUserCircle, FaSignOutAlt, FaCalendarAlt, FaArrowLeft, FaEdit, FaBell } from "react-icons/fa";
import { db } from "../../lib/firebase"; // Assuming Firebase is set up in this path
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firestore imports
import FlashcardModal from "../components/flashcardmodal";

export default function Profile() {
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState<string>(""); // Default to empty string
  const [isEditing, setIsEditing] = useState(false); // State to toggle image URL input visibility
  const [isSaving, setIsSaving] = useState(false); // To track saving state

  // Fetch the profile image URL when the component mounts
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (user?.id) {
        try {
          const userDocRef = doc(db, "users", user.id); // Firestore path to user's data
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data?.profileImageUrl) {
              setImageUrl(data.profileImageUrl); // Set image URL from Firestore
            }
          }
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      }
    };

    fetchProfileImage();
  }, [user?.id]); // Only re-run if the user id changes

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value); // Update the state with the URL
  };

  const handleAddImageLink = async () => {
    if (!imageUrl) return; // If there's no URL, do nothing

    setIsSaving(true);

    try {
      // Store the image URL in Firestore
      await setDoc(doc(db, "users", user?.id || ""), {
        profileImageUrl: imageUrl,
      });

      alert("Profile image link added successfully!");
    } catch (error) {
      console.error("Error saving profile image URL:", error);
      alert("Failed to add image link.");
    } finally {
      setIsSaving(false);
      setIsEditing(false); // Close the editing mode after saving
    }
  };

  const handleSignOut = async () => {
    await signOut();
    localStorage.clear();
    router.push("/");
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

      {/* Greeting Section */}
      <div className="text-center text-2xl text-[#02343F] mt-6">
        <p>Hi!</p>
        <p className="font-bold">{user?.fullName || "User"}</p>
      </div>

      {/* Profile Section */}
      <div className="bg-[#02343F] text-[#F0EDCC] w-full max-w-sm p-6 rounded-lg mx-auto mt-6 flex flex-col items-center">
        {imageUrl ? (
          <img src={imageUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
            <FaUserCircle className="w-12 h-12 text-white" />
          </div>
        )}

        {/* Edit Button to trigger the image URL input */}
        <button 
          onClick={() => setIsEditing(true)} 
          className="text-blue-500 text-sm mt-2 flex items-center gap-1"
        >
          <FaEdit />
          Edit Profile Picture
        </button>

        {/* Show the URL input and Save button only if editing */}
        {isEditing && (
          <div className="w-full mt-4">
            <input
              type="text"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 text-black rounded-md"
            />
            <button
              onClick={handleAddImageLink}
              className="w-full py-2 bg-blue-500 text-white rounded-md mt-2"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Add Image Link"}
            </button>
          </div>
        )}
      </div>
        <div className="flex flex-col items-center mt-6">
      <FlashcardModal /> {/* Flashcard Modal Component */}
      </div>

      {/* Sign Out Button */}
      <div className="absolute bottom-28 left-0 w-full flex justify-center">
        <button
          onClick={handleSignOut}
          className="flex items-center text-red-600 text-base font-semibold px-6 py-2 bg-white rounded-lg shadow-md"
        >
          <FaSignOutAlt className="mr-2" />
          Sign Out
        </button>
      </div>

      {/* Navigation Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-white py-4 rounded-t-2xl shadow-lg flex items-center">
        <button onClick={() => router.push('/dashboard')} className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
          <FaHome className="w-9 h-9" />
          <span className="text-sm">Home</span>
        </button>
        <button onClick={() => router.push('/profile')} className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
          <FaUserCircle className="w-9 h-9" />
          <span className="text-sm">Profile</span>
        </button>
        <button onClick={() => router.push('/calendar')} className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
          <FaCalendarAlt className="w-9 h-9" />
          <span className="text-sm">Calendar</span>
        </button>
        <button onClick={() => router.push('/notification')} className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
          <FaBell className="w-9 h-9" />
          <span className="text-sm">Notifications</span>
        </button>
      </div>
    </div>
  );
}