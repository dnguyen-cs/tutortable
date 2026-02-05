import type { Metadata } from "next";
import { google_sans_code } from "../../ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tutor Table",
  description: "A tutoring management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${google_sans_code.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
