import type { Metadata } from "next";
import { fira_code } from "../../ui/fonts";
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
        className={`${fira_code.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
