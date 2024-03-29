import { Rubik } from "next/font/google";
import "./globals.css";
import { WineProvider } from "./context/wineContext";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <WineProvider>
      <html lang="en">
        <body className={rubik.className}>{children}</body>
      </html>
    </WineProvider>
  );
}
