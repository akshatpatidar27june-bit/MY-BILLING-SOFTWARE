import type { Metadata } from "next"; import "./globals.css";
export const metadata:Metadata={title:"RestroFlow — Restaurant Business Platform",description:"Restaurant billing and business management platform"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}