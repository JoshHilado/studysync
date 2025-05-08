"use client"

<<<<<<< HEAD
import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#F0EDCC] flex flex-col items-center justify-center">
      <h1 className="text-5xl font-black text-[#02343F] mb-8">StudySync</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              card: "shadow-none border-none",
              headerTitle: "text-[#02343F] text-3xl font-bold",
              formButtonPrimary: "bg-[#02343F] text-[#F0EDCC] hover:bg-[#012830]",
              footerActionText: "text-black",
              footerActionLink: "text-[#3619B8] font-bold",
            },
          }}
          afterSignInUrl="/dashboard"
          signUpUrl="/sign_up"
        />
      </div>
=======
export default function StudySyncInfoPage() {
  return (
    <div className="min-h-screen bg-[#F0EDCC] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-black text-[#02343F] mb-4">StudySync</h1>
      <p className="text-lg text-[#02343F] max-w-xl mb-6">
        StudySync is your all-in-one academic planner designed to help students organize tasks, manage deadlines, and stay on top of their academic goals. With a clean interface and smart features, it turns school chaos into calm productivity.
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
>>>>>>> master
    </div>
  )
}
