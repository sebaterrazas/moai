import { GeistSans } from "geist/font/sans";
import { type Metadata } from 'next'

import SupabaseProvider from './supabase-provider';
import { Providers } from './providers'

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const image = `/icon.png` as const
const title = 'Moais Marauders: Traveling the World through your photos'
const description =
  'Moais Marauders is a photo sharing app that allows you to travel the world through the eyes of others.'
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  icons: {
    icon: '/favicon.ico',
  },
  title: title,
  description: description,
  openGraph: {
    images: [image],
    title: title,
    description: description,
    type: 'website',
  },
  twitter: {
    images: [image],
    title: title,
    description: description,
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground overflow-hidden">
        <main className="min-h-screen flex flex-col items-center">
          <SupabaseProvider>
            <Providers>
              {children}
            </Providers>
          </SupabaseProvider>
        </main>
      </body>
    </html>
  );
}
