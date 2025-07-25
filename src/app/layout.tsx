import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
// import Header from "@/components/custom/Header";
import StoreProvider from "./StoreProvider";
import Header from "@/components/custom/Header";
import { Toaster } from "sonner";
import Refresher from "@/components/custom/Refresher";
import QueryProvider from "./QueryProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={cn(
            'min-h-screen bg-background font-manrope antialiased',
            manrope.variable
          )}
        >
          <QueryProvider>
            <Refresher>
              <Header />
              {children}
              <Toaster />
            </Refresher>
          </QueryProvider>
        </body>

      </StoreProvider>
    </html>
  );
}
