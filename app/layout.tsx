"use client"

import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import React from "react";
import "./globals.css"

export default function ROOTlayout({children}: {children: React.ReactNode}){
  const pathName = usePathname();
  const hidebar = pathName === "/login" || pathName === "/signup";

  return(
    <html lang="en">
      <body>
        {!hidebar && <Navbar />}
        <main>{children}</main>
      </body>
    </html>
  )
}