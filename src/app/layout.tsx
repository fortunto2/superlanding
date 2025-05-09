import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Используем английский как default
  const locale = 'en';
  
  // Загружаем сообщения для en локали напрямую
  const messages = {
    "Navigation": {
      "home": "Home",
      "blog": "Blog",
      "pricing": "Pricing",
      "login": "Log In",
      "signup": "Sign Up"
    },
    "Footer": {
      "copyright": "© 2023 SuperDuperAI. All rights reserved.",
      "links": {
        "privacy": "Privacy Policy", 
        "terms": "Terms of Service",
        "contact": "Contact Us"
      }
    }
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
