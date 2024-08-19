import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { Sidebar } from '@/components/sidebar/sidebar';

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
