'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaUserCircle, FaCalendarAlt, FaArrowLeft, FaPen, FaBell } from 'react-icons/fa';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';

interface Task {
  id: string;
  subject: string;
  isCompleted: boolean;
  dueDate: string; // stored as string in "YYYY-MM-DD" format
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem('studysync_user') || '{}')
    : {};

  useEffect(() => {
    if (!user?.id) return;

    const q = query(collection(db, 'tasks'), where('userId', '==', user.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTasks(taskList);
    });

    return () => unsubscribe();
  }, [user]);

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return '';
    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTaskStatus = (dueDate: string) => {
    const currentDate = new Date();
    const taskDate = new Date(dueDate);
    if (taskDate < currentDate) {
      return '(PAST DUE)';
    } else if (taskDate.toDateString() === currentDate.toDateString()) {
      return '(ONGOING)';
    } else {
      return '';
    }
  };

  const handleTaskCompletion = async (taskId: string, isCompleted: boolean) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        isCompleted: !isCompleted,
      });
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F0EDCC] px-4 py-6 font-[Poppins] relative">
      {/* Header */}
      <div className="flex justify-between items-center text-3xl text-[#02343F]">
        <span>StudySync</span>
      </div>

      {/* Date Section */}
      <div className="flex justify-between mt-4 text-[#02343F] text-4xl">
        <span>Today</span>
        <span>{getCurrentDate()}</span>
      </div>

      {/* Task List */}
      <div className="mt-6 bg-[#02343F] text-[#F0EDCC] p-6 rounded-lg">
        {tasks.length === 0 ? (
          <p>No Tasks</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="flex flex-col p-4 border-b border-[#F0EDCC]">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleTaskCompletion(task.id, task.isCompleted)}
                  className="w-6 h-6"
                />
                <span className={`text-lg ${task.isCompleted ? 'line-through' : ''}`}>
                  {task.subject}
                </span>
              </div>
              <div className="text-sm mt-2">
                {!task.isCompleted && <span>{formatDate(task.dueDate)}</span>}
                {!task.isCompleted && <span className="text-gray-500 ml-2">{getTaskStatus(task.dueDate)}</span>}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Button */}
      <div className="absolute bottom-20 ml-80">
        <button onClick={() => router.push('/add_tasks')} className="bg-[#02343F] text-white p-4 rounded-full shadow-lg mb-10">
          <FaPen className="w-9 h-9" />
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
