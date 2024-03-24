import { Arimo } from "next/font/google";

import "./reset.scss";

import Providers from "../components/Providers";
import Appbar from "../components/Appbar/Appbar";


const arimo = Arimo({
    subsets: ['latin', "cyrillic"],
    display: 'swap',
    variable: '--font-arimo',
})

export const metadata = {
  title: "PortfolioManager",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ua">
      <body className={arimo.className}>
      <Providers>
          <Appbar />
          {children}
      </Providers>
      </body>
    </html>
  );
}
