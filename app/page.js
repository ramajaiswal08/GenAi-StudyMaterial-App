"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 via-white to-indigo-100 text-center px-6">
      {/* Hero Section */}
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
        AI Study Material Generator ✨
      </h1>
      <p className="mt-6 text-lg text-gray-700 max-w-2xl">
        Save time and focus on learning — instantly generate personalized study notes,
        summaries, and course content powered by AI.
      </p>

      {/* Call to Action */}
      <div className="mt-8 flex gap-4">
        <Button
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-transform hover:scale-105"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard 🚀
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="hover:bg-gray-100 transition-transform hover:scale-105"
          onClick={() => router.push("/sign-up")}
        >
          Sign Up Free
        </Button>
      </div>

      {/* Feature Highlights */}
      <div className="mt-16 grid gap-8 sm:grid-cols-3 text-left max-w-4xl">
        <div className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📚 Course Summaries</h3>
          <p className="text-gray-600">Generate concise summaries tailored to your syllabus.</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📝 Smart Notes</h3>
          <p className="text-gray-600">Create AI-powered notes for faster revision and retention.</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📊 Study Plans</h3>
          <p className="text-gray-600">Auto-generate structured plans to stay on track with learning.</p>
        </div>
      </div>
    </main>
  );
}
