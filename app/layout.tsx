import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ToastProvider } from "@/components/toast-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swapz",
  description: "This is app for selling products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`p-0 lg:px-4 ${inter.className}`}>
          <ToastProvider />
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
