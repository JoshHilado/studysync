'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaUserCircle, FaCalendarAlt, FaArrowLeft, FaTrash, FaEdit } from 'react-icons/fa';
import { db } from '../../lib/firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

export default function AddTask() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | null>(null);  // Use Date object for date
  const [tasks, setTasks] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const user = JSON.parse(localStorage.getItem('studysync_user') || '{}');

  useEffect(() => {
    if (!user?.id) return;

    const q = query(collection(db, 'tasks'), where('userId', '==', user.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.id) {
      alert('User not found. Please sign in again.');
      return;
    }

    const taskData = {
      userId: user.id,
      subject,
      description,
      date: date ? date : new Date(),  // Store Date object in Firestore
      createdAt: new Date(),
    };

    try {
      if (editId) {
        const taskRef = doc(db, 'tasks', editId);
        await updateDoc(taskRef, taskData);
        setEditId(null);
      } else {
        await addDoc(collection(db, 'tasks'), taskData);
      }

      setSubject('');
      setDescription('');
      setDate(null);
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task.');
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  };

  const handleEdit = (task: any) => {
    setSubject(task.subject);
    setDescription(task.description);
    setDate(task.date.toDate());  // Convert Firestore timestamp to JavaScript Date object
    setEditId(task.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  };

  const formatDisplayDate = (dateObj: Date) => {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#F0EDCC] px-4 py-6 font-[Poppins] relative pb-40">
        <div className="flex justify-between items-center text-3xl text-[#02343F]">
          <button onClick={() => router.push('/dashboard')}>
            <FaArrowLeft className="w-8 h-8" />
          </button>
          <span className="flex-grow text-center">{editId ? 'Edit Task' : 'Add Task'}</span>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Task Name"
            className="w-full p-4 border-none rounded-lg bg-white text-[#02343F] text-lg shadow-md"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <textarea
            ref={descriptionRef}
            placeholder="Task Description"
            className="w-full p-4 border-none rounded-lg bg-white text-[#02343F] text-lg shadow-md resize-none overflow-hidden"
            rows={2}
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          <input
            type="date"
            className="w-full p-4 border rounded-lg bg-white text-lg text-[#02343F] shadow-md"
            value={date ? date.toISOString().split('T')[0] : ''}
            onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : null)}
            required
          />
          <button type="submit" className="w-full bg-[#02343F] text-white p-4 rounded-lg text-lg shadow-md">
            {editId ? 'Update Task' : 'Save Task'}
          </button>
        </form>

        {/* Task List */}
        <div className="mt-10 space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#02343F]">{task.subject}</h3>
              <p className="text-[#02343F]">{task.description}</p>
              <p className="text-sm text-[#02343F]">Due: {formatDisplayDate(task.date.toDate())}</p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-white py-4 rounded-t-2xl shadow-lg flex items-center">
          <button onClick={() => router.push('/dashboard')} className="flex flex-col flex-1 items-center text-[#02343F]">
            <FaHome className="w-7 h-7" />
            <span className="text-sm">Home</span>
          </button>
          <button onClick={() => router.push('/profile')} className="flex flex-col flex-1 items-center text-[#02343F]">
            <FaUserCircle className="w-7 h-7" />
            <span className="text-sm">Profile</span>
          </button>
          <button onClick={() => router.push('/calendar')} className="flex flex-col flex-1 items-center text-[#02343F]">
            <FaCalendarAlt className="w-7 h-7" />
            <span className="text-sm">Calendar</span>
          </button>
        </div>
      </div>
    </>
  );
}
