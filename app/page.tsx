"use client"

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
    </div>
  )
}
