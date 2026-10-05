import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SMARTBILLZ — Restaurant Billing Software for India",
  description: "Professional restaurant billing, inventory, staff, outlet and business management software built for Indian restaurants.",
  icons: { icon: "/SmallSquareLogoJpg.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
