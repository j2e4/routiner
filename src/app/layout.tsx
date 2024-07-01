import 'src/app/globals.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import GlobalNav from 'src/components/global-nav';
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
        <div className="fixed inset-x-0 top-0 z-50 h-16 border-b border-theme-neutral-330 bg-theme-neutral-350">
          <GlobalNav />
        </div>
        <div className="relative mx-auto min-h-screen max-w-2xl space-y-8 bg-white pt-16 shadow-lg shadow-black/10">
          <GlobalQueryClientProvider>
            <main>{children}</main>
            <ReactQueryDevtools />
          </GlobalQueryClientProvider>
        </div>
      </body>
    </html>
  );
}
