import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunito_sans = Nunito_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
  title: "LSEG - Interview Task",
  description: "This is my submission for the LSEG interview task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${nunito_sans.className}  h-auto w-screen bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}