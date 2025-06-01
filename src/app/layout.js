"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/authContext";
import CustomHeader from "../components/Header";
import CustomFooter from "../components/Footer";
import ClientInitializer from "../components/ClientInitializer";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Coding Rooms",
//   description: "Your platform that groups all competitions in one place",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/src/app/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          {/* <AuthProvider> */}
            
            <ClientInitializer />
            <CustomHeader />
            {children}
            <CustomFooter />
          {/* </AuthProvider> */}

        </Provider>
      </body>
    </html>
  );
}
