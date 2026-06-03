import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['700'],
});

export const metadata: Metadata = {
  title: 'Lucyn — The institutional memory of your company',
  description:
    'Lucyn turns scattered company knowledge into a living, connected map of how your company actually works.',
  openGraph: {
    title: 'Lucyn — The institutional memory of your company',
    description:
      'Lucyn turns scattered company knowledge into a living, connected map of how your company actually works.',
    url: 'https://lucyn-website.vercel.app',
    siteName: 'Lucyn',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucyn — The institutional memory of your company',
    description:
      'Lucyn turns scattered company knowledge into a living, connected map of how your company actually works.',
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
