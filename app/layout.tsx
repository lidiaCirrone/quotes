import type { Metadata } from "next";
import { Afacad_Flux, DM_Serif_Display } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import { Providers } from "./providers";

const afacadFluxSans = Afacad_Flux({
  variable: "--font-afacad-flux-sans",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Quotes",
  description: "a quote CRUD platform developed in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${afacadFluxSans.variable} ${dmSerifDisplay.variable} antialiased`}
      >
        <Toaster toastOptions={{
          className: "font-sans"
        }} />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
