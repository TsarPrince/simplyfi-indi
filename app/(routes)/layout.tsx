import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
// import "./tiptap.css";

import { ToastContainer } from "react-toastify";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Footer from "../components/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://simplyfi-beta.vercel.app/"),
  title: {
    template: "%s | PublicHQ",
    default: "PublicHQ", // a default is required when creating a template
  },
  description: "PublicHQ",
  authors: [{ name: "tsarprince", url: "https://github.com/TsarPrince/" }],
  openGraph: {
    images: "/og.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ToastContainer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
