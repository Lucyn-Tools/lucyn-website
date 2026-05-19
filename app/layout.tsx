import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lucyn — The AI Product Engineer',
  description:
    'Lucyn understands your codebase, your people, and your product direction — then actively participates in execution.',
  openGraph: {
    title: 'Lucyn — The AI Product Engineer',
    description: 'The AI Product Engineer that works inside your company.',
    url: 'https://lucyn-website.vercel.app',
    siteName: 'Lucyn',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucyn — The AI Product Engineer',
    description: 'The AI Product Engineer that works inside your company.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
