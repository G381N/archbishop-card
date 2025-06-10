import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "✠ MAR ILIOS YOHANAN KURIAKOSE - Metropolitan Archbishop",
  description: "Digital Business Card - Metropolitan Archbishop & Apostolic Nuncio of Asia",
  keywords: "Archbishop, Metropolitan, Catholic, ECCC, India, Calicut, Kerala, Detroit, Michigan, Religious Leader",
  authors: [{ name: "MAR ILIOS YOHANAN KURIAKOSE" }],
  creator: "ECCLESIA CATHOLICA ECUMENICA CHRISTI (ECCC) – INDIA",
  publisher: "ECCLESIA CATHOLICA ECUMENICA CHRISTI (ECCC) – INDIA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://archbishop-card.vercel.app'),
  openGraph: {
    title: "MAR ILIOS YOHANAN KURIAKOSE - Metropolitan Archbishop",
    description: "Digital business card for MAR ILIOS YOHANAN KURIAKOSE, Metropolitan Archbishop & Apostolic Nuncio of Asia",
    type: "profile",
    locale: "en_US",
    siteName: "Archbishop Digital Card",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAR ILIOS YOHANAN KURIAKOSE - Metropolitan Archbishop",
    description: "Digital business card for MAR ILIOS YOHANAN KURIAKOSE, Metropolitan Archbishop & Apostolic Nuncio of Asia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://archbishop-card.vercel.app" />
        <meta name="theme-color" content="#f6af09" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
