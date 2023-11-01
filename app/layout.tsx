import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Container from "./components/Container";
import Footer from "./components/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Acme",
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
        {children}
        <div className="bg-gray">
          <Container>
            <Footer />
          </Container>
        </div>
      </body>
    </html>
  );
}
