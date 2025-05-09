'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from "date-fns";
import { FaHome, FaUserCircle, FaCalendarAlt, FaArrowLeft, FaTimes, FaBell } from "react-icons/fa";
import { db } from "../../lib/firebase"; // Assuming Firebase is set up in this path
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore"; // Firestore imports
import { Timestamp } from "firebase/firestore";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState<any[]>([]); // State to store tasks
  const [selectedDay, setSelectedDay] = useState<Date | null>(null); // Track selected day
  const [modalVisible, setModalVisible] = useState(false); // Control modal visibility
  const [selectedTasks, setSelectedTasks] = useState<any[]>([]); // Tasks for the selected day
  const router = useRouter();

  // Get the start and end of the current month
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  // Fetch tasks from Firebase for the current month
  useEffect(() => {
    const fetchTasks = () => {
      // Query the tasks collection and filter by dueDate
      const q = query(
        collection(db, "tasks"),
        where("date", ">=", start),
        where("date", "<=", end)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const taskList = snapshot.docs.map((doc) => {
          const data = doc.data();
          const taskDueDate = data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date);

          return {
            id: doc.id,
            date: taskDueDate,
            subject: data.subject || "", // Ensure subject is included
            isCompleted: data.isCompleted || false, // Ensure isCompleted is included
          };
        });

        // Filter out completed tasks
        const filteredTasks = taskList.filter(task => !task.isCompleted);
        setTasks(filteredTasks);
      });

      return () => unsubscribe(); // Cleanup listener
    };

    fetchTasks();
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.setMonth(prev.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.setMonth(prev.getMonth() + 1)));
  };

  const getTasksForDay = (day: Date) => {
    return tasks.filter((task) => {
      const taskDate = task.date;
      return isSameDay(taskDate, day);
    });
  };

  const handleDayClick = (day: Date) => {
    const dayTasks = getTasksForDay(day);
    setSelectedDay(day);
    setSelectedTasks(dayTasks);
    setModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTasks([]); // Clear the selected tasks when the modal is closed
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      // Remove the task from Firestore
      await deleteDoc(doc(db, "tasks", taskId));
      // Also remove the task from the local state
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setSelectedTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
      alert("Failed to delete task.");
    }
  };

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
        <div className="flex justify-between items-center">
          <button onClick={handlePrevMonth}>{"<"}</button>
          <h2 className="text-lg font-semibold text-center">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <button onClick={handleNextMonth}>{">"}</button>
        </div>

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
          {days.map((day: Date) => {
            const dayTasks = getTasksForDay(day);

            return (
              <div
                key={format(day, "yyyy-MM-dd")}
                className={`p-2 ${format(day, "E") === "Sun" ? "text-red-400" : "text-[#F0EDCC]"} relative`}
                onClick={() => handleDayClick(day)} // Add click handler
              >
                <div
                  className={`${
                    dayTasks.length > 0
                      ? "bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                      : ""
                  }`}
                >
                  {format(day, "d")}
                </div>
                {dayTasks.length > 0 && (
                  <div className="absolute top-0 right-0 bg-[#F0EDCC] text-[#02343F] text-xs p-1 rounded-md">
                    {dayTasks.length}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* No Tasks Message */}
      {tasks.length === 0 && (
        <div className="bg-[#02343F] text-[#F0EDCC] w-full max-w-sm p-6 rounded-lg mx-auto mt-6 flex items-center justify-center text-3xl font-semibold h-24">
          No Tasks
        </div>
      )}

      {/* Modal for Task Subjects */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Tasks for {format(selectedDay!, "MMMM dd, yyyy")}</h3>
              <button onClick={closeModal}>
                <FaTimes className="w-6 h-6 text-[#02343F]" />
              </button>
            </div>
            <div className="mt-4">
              {selectedTasks.length === 0 ? (
                <div>No tasks for this day.</div>
              ) : (
                selectedTasks.map((task) => (
                  <div key={task.id} className="text-sm py-1">
                    <div>{task.subject}</div>
                    {task.isCompleted && (
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600 text-xs mt-1"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

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
