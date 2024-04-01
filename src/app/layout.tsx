import 'src/app/globals.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import GlobalNavbar from 'src/components/global-navbar';
import GlobalQueryClientProvider from 'src/services/server-state/query-client-provider';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Routiner',
    default: 'My routiner',
  },
  description: 'The app about my routines',
  keywords: ['routiner', 'routines', 'routine'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalNavbar />
        <div className="relative mx-auto min-h-screen max-w-2xl space-y-8 bg-white pt-16 shadow-lg shadow-black/10">
          <GlobalQueryClientProvider>
            {children}
            <ReactQueryDevtools />
          </GlobalQueryClientProvider>
        </div>
      </body>
    </html>
  );
}
