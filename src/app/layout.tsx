import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/components/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Syntra Media - Opening soon!",
  description: "Syntra Media is a digital agency that specializes in web development and design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-light bg-bg`}>
          <NextAuthSessionProvider>
            {children}
          </NextAuthSessionProvider>
      </body>
    </html>
  );
}
