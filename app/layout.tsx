import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Geonixa LMS",
    template: "%s | Geonixa LMS",
  },
  description: "A comprehensive Learning Management System for students and administrators.",
  keywords: ["LMS", "Learning Management System", "Education", "Online Courses", "Geonixa", "Student Portal", "Admin Dashboard"],
  metadataBase: new URL("https://lms.geonixa.com"),
  openGraph: {
    title: "Geonixa LMS",
    description: "Empowering education through technology. Join our learning platform today.",
    url: "/",
    siteName: "Geonixa LMS",
    images: [
      {
        url: "https://www.geonixa.com/_next/image?url=%2Fgeonixa.png&w=1200&q=75",
        width: 1200,
        height: 630,
        alt: "Geonixa LMS",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geonixa LMS",
    description: "A comprehensive Learning Management System for students and administrators.",
    images: ["https://www.geonixa.com/_next/image?url=%2Fgeonixa.png&w=1200&q=75"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body className={ cn("min-h-screen", poppins.className)}>
        {children}
      </body>
    </html>
  );
}
