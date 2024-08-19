import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { DashboardSidebar } from './components/dashboard-sidebar';

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
      <DashboardSidebar />
      {children}
    </>
  );
}
