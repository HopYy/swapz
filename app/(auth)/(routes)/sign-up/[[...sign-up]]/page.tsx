import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex-1 h-screen flex justify-center items-center">
      <SignUp />
    </div>
  );
}
