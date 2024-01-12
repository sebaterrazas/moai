import { GeistSans } from "geist/font/sans";
import { type Metadata } from 'next'

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const image = `/icon.png` as const
const title = 'Moai\' Marauders: Traveling the World through your photos'
const description =
  'Moai\'s Marauders is a photo sharing app that allows you to travel the world through the eyes of others.'
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
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
