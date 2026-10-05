import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Billing — Restaurant Billing Software for India",
  description: "Powerful restaurant billing, inventory, staff and business management software built for India.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}