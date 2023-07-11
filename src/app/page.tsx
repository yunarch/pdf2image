"use client";

import dynamic from "next/dynamic";
import "../styles/globals.css";

const Pdf2ImagePage = dynamic(() => import("./Pdf2ImagePage"), { ssr: false });

export default function homePage() {
  return <Pdf2ImagePage />;
}
