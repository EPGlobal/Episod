import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const unica77 = localFont({
  src: [
    {
      path: '../../public/fonts/Unica77 Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Unica77 Light Italic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Unica77 Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Unica77 Regular Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Unica77 Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Unica77 Medium Italic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Unica77 Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Unica77 Bold Italic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-unica77',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "EPISOD",
  description: "Rooted in the raw with rare ingredients, made to awaken every sense and disrupt all frequencies. Created for those who move through the world with instinct.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  keywords: "fragrance, perfume, episod, rare ingredients, scent, luxury",
  authors: [{ name: "EPISOD" }],
  openGraph: {
    title: "EPISOD",
    description: "Rooted in the raw with rare ingredients, made to awaken every sense and disrupt all frequencies. Created for those who move through the world with instinct.",
    type: "website",
    siteName: "EPISOD",
    images: [
      {
        url: "/1.jpg",
        width: 1200,
        height: 630,
        alt: "EPISOD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EPISOD",
    description: "Rooted in the raw with rare ingredients, made to awaken every sense and disrupt all frequencies.",
    images: ["/1.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={unica77.variable}>
      <body className={unica77.className}>
        {children}
      </body>
    </html>
  );
}
