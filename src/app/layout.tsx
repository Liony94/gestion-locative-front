'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from "next/font/google";
import DashboardHeader from './dashboard/components/DashboardHeader';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <html lang="fr" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {isDashboard && <DashboardHeader />}
          <main className={isDashboard ? 'pt-4' : ''}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
