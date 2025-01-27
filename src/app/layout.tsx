'use client';

import { useState, useEffect } from 'react';
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
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  useEffect(() => {
    // Fonction pour vérifier la taille de l'écran
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // 1024px est la breakpoint lg de Tailwind
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Vérifier la taille initiale
    checkScreenSize();

    // Ajouter l'écouteur d'événement pour le redimensionnement
    window.addEventListener('resize', checkScreenSize);

    // Nettoyer l'écouteur d'événement
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (!isLargeScreen) {
      setIsSidebarOpen(false);
    }
  };

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
                <DashboardHeader isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
                <main className={`pt-16 transition-all duration-300 ${isLargeScreen ? 'lg:pl-64' : ''}`}>
                  <div className="p-4 md:p-6">
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
