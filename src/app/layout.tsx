import type { Metadata } from "next";
import { Crimson_Text, Source_Sans_3 } from "next/font/google";
import "./globals.css";

// Google Fonts
const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson-text",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "Archbishop MAR ILIOS YOHANAN KURIAKOSE - Digital Business Card",
  description: "Official digital business card of Archbishop MAR ILIOS YOHANAN KURIAKOSE, featuring contact information for both India and USA offices.",
  keywords: "Archbishop, MAR ILIOS YOHANAN KURIAKOSE, Saint Francis, Cathedral, Calicut, Detroit, digital business card",
  authors: [{ name: "Archbishop MAR ILIOS YOHANAN KURIAKOSE" }],
  openGraph: {
    title: "Archbishop MAR ILIOS YOHANAN KURIAKOSE",
    description: "Official digital business card",
    type: "profile",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${crimsonText.variable} ${sourceSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
