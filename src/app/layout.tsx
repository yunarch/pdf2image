import type { ReactNode } from "react";
import { ThemeRegistry } from "../components/ThemeRegistry";

export const metadata = {
  title: "Pdf2Image",
  description: "Application to convert a pdf into image and vice versa",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
