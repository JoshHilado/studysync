'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaHome, FaUserCircle, FaCalendarAlt, FaBell } from "react-icons/fa";
import { db } from "../../lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore"; // Firebase imports
import { Timestamp } from "firebase/firestore"; // Timestamp import

interface Task {
  id: string;
  subject: string;
  date: Timestamp; // Storing as Firebase Timestamp
  userId: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [crossedOut, setCrossedOut] = useState<Set<string>>(new Set()); // Tracks crossed out tasks
  const router = useRouter();

  const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("studysync_user") || "{}")
    : {};

  // Format date to "Month Day, Year" format
  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to check if the task is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Helper function to check if the task is past due
  const isPastDue = (date: Date) => {
    const currentDate = new Date();
    return date < currentDate;
  };

  // Fetch notifications for tasks that the user has
  useEffect(() => {
    if (!user?.id) return;

    const q = query(collection(db, "tasks"), where("userId", "==", user.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];

      const currentNotifications = taskList.map((task) => {
        const taskDate = task.date.toDate();

        // Determine if the task is due today, past due, or just a reminder
        const isTaskDueToday = isToday(taskDate);
        const isTaskPastDue = isPastDue(taskDate);
        const dueDateFormatted = formatDisplayDate(taskDate);

        return {
          taskId: task.id,
          subject: task.subject,
          isDueToday: isTaskDueToday,
          isPastDue: isTaskPastDue,
          dueDateFormatted: dueDateFormatted,
        };
      });

      setNotifications(currentNotifications);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCrossOutNotification = (taskId: string) => {
    setCrossedOut((prev) => {
      const newCrossedOut = new Set(prev);
      if (newCrossedOut.has(taskId)) {
        newCrossedOut.delete(taskId); // If already crossed out, remove
      } else {
        newCrossedOut.add(taskId); // Otherwise, add to crossed out
      }
      return newCrossedOut;
    });
  };

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

      {/* Notification List */}
      <div className="flex-grow mt-6">
        {notifications.length === 0 ? (
          <div className="text-center text-[#02343F] text-4xl font-semibold">
            No Notifications
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.taskId}
              className="p-4 border-b border-[#F0EDCC]"
            >
              <div className="flex justify-between items-center">
                <span
                  className={`text-lg font-semibold ${crossedOut.has(notif.taskId) ? "line-through text-gray-400" : ""}`}
                >
                  {notif.subject}
                </span>
                {notif.isDueToday ? (
                  <span className="text-red-500">Due Today</span>
                ) : notif.isPastDue ? (
                  <span className="text-red-500">Past Due</span>
                ) : (
                  <span className="text-gray-500">Due on {notif.dueDateFormatted}</span>
                )}
              </div>
              <button
                onClick={() => handleCrossOutNotification(notif.taskId)}
                className="text-gray-500 text-sm mt-2"
              >
              </button>
            </div>
          ))
        )}
      </div>

      {/* Navigation Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-white py-4 rounded-t-2xl shadow-lg flex items-center">
        <button onClick={() => router.push("/dashboard")} className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
          <FaHome className="w-9 h-9" />
          <span className="text-sm">Home</span>
        </button>
        <button onClick={() => router.push("/profile")} className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
          <FaUserCircle className="w-9 h-9" />
          <span className="text-sm">Profile</span>
        </button>
        <button onClick={() => router.push("/calendar")} className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
          <FaCalendarAlt className="w-9 h-9" />
          <span className="text-sm">Calendar</span>
        </button>
        <button onClick={() => router.push("/notification")} className="flex flex-col flex-1 items-center text-[#02343F] space-y-1">
          <FaBell className="w-9 h-9" />
          <span className="text-sm">Notifications</span>
        </button>
      </div>
    </div>
  );
}
