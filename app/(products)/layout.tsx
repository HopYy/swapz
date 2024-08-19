import { Sidebar } from '@/components/sidebar/sidebar';

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
