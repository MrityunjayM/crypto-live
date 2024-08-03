import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "@/redux/StoreProvider";
import "bootstrap/dist/css/bootstrap.min.css";

import "@/cron";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoLive",
  description: "A site for crypto live price",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <script
            async
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
            crossOrigin="anonymous"
          ></script>
        </head>
        <body className={inter.className}>
          <div className="container">
            <nav className="navbar bg-info mb-3 px-2">
              <a className="navbar-brand" href="#">
                Crypto Live
              </a>
            </nav>
            {children}
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
