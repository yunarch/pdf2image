import type { ReactNode } from "react";
import { Header } from "../components/Header";
import { ThemeRegistry } from "../components/ThemeRegistry";

export const metadata = {
  title: "PDF to image converter",
  description: "Application to convert a pdf into image and vice versa",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
