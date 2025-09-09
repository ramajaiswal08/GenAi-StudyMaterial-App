// app/sign-in/page.tsx (or wherever your SignIn page is)
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <SignIn />
        
      </div>
    </main>
  );
}
