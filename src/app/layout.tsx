import type { Metadata } from "next";
import "../styles/globals.scss";


export const metadata: Metadata = {
  title: "Expert Tutor | Video",
  description: "Expert Tutor | Video",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
