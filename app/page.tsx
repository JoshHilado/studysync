'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function StudySyncInfoPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if signed in AND currently on root path `/`
    if (isLoaded && isSignedIn && user && pathname === '/') {
      const userData = {
        id: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
      };

      localStorage.setItem('studysync_user', JSON.stringify(userData));
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, user, pathname, router]);

  return (
    <div className="min-h-screen bg-[#F0EDCC] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-black text-[#02343F] mb-4">StudySync</h1>

      {isLoaded && isSignedIn && (
        <p className="text-[#02343F] text-lg mb-4">
          Welcome back, <span className="font-bold">{user.firstName}</span>!
        </p>
      )}

      <p className="text-lg text-[#02343F] max-w-xl mb-6">
        StudySync is your all-in-one academic planner designed to help students organize tasks,
        manage deadlines, and stay on top of their academic goals. With a clean interface and smart
        features, it turns school chaos into calm productivity.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#02343F] mb-4">Features:</h2>
        <ul className="list-disc text-left text-[#02343F] pl-6 space-y-2">
          <li>Create and manage academic tasks</li>
          <li>Set deadlines and receive reminders</li>
          <li>Track your academic progress</li>
          <li>Sync across devices</li>
        </ul>
      </div>

      <p className="text-[#02343F] mt-8">
        Ready to boost your productivity?{' '}
        <a href="/sign-in" className="text-[#3619B8] font-bold hover:underline">
          Sign in now
        </a>
        .
      </p>
    </div>
  );
}
