import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CheckoutProvider } from "@/context/CheckoutContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Ecoyaan — Checkout",
  description: "Checkout for sustainable goods",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plusJakarta.variable}`}>
      <body>
        <CheckoutProvider>{children}</CheckoutProvider>
      </body>
    </html>
  );
}
