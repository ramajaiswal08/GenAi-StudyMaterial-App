import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import WelcomeBanner from './_components/WelcomeBanner';
import GetCourseList  from './_components/CourseList';
const Dashboard = () => {
  return (
    <ClerkProvider>
      <div>
        <SignedOut>
          <SignIn routing="hash" />
        </SignedOut>

        <SignedIn>
          <WelcomeBanner/>
          <GetCourseList />
        </SignedIn>
      </div>
    </ClerkProvider>
  );
};

export default Dashboard;
