import type { Metadata } from "next";
import "../styles/globals.scss";
import Footer from "@/components/Footer/Footer";

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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
