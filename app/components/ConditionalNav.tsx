"use client";

import { usePathname } from "next/navigation";
import PrimaryNav from "./PrimaryNav";

export default function ConditionalNav() {
  const pathname = usePathname();

  if (pathname === "/demo" || pathname === "/3d-viewer") {
    return null;
  }

  return <PrimaryNav />;
}