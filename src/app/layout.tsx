'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from "next/font/google";
import DashboardHeader from './dashboard/components/DashboardHeader';
import Sidebar from './dashboard/components/Sidebar';
import "./globals.css";
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from 'sonner';

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
    <html lang="fr" className="h-full" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {isDashboard && (
              <>
                <DashboardHeader />
                <Sidebar />
                <main className="pl-64 pt-16">
                  <div className="p-6">
                    {children}
                  </div>
                </main>
              </>
            )}
            {!isDashboard && (
              <main>
                {children}
              </main>
            )}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              },
              className: 'dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700',
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
