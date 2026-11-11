import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial"],
});

export const metadata: Metadata = {
  title: {
    default: "Nexmile HRMS",
    template: "%s | Nexmile HRMS",
  },
  description: "Human resource management system for Nexmile Technology.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
