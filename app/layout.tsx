import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { ToastProvider } from '@/components/toast-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Swapz',
  description: 'App for buying and selling products.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <ToastProvider />
          <div className="flex justify-center">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
