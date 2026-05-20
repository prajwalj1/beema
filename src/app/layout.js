import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BeemaDukaan - Nepal's Premier Digital Insurance Platform",
  description: "Secure your future with BeemaDukaan. Compare and buy whole life plans, child protection, endowment plans, and term insurance policies. Connect with our authorized agent promoter network for reliable insurance consulting across Nepal.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Toaster position="top-center" />
          <Header />
          <main className="flex-1 pt-20">
            {children}
          </main>
             <Footer />
        </Providers>
      </body>
    </html>
  );
}
