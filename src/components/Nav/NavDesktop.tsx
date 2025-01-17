"use client";

import Link from "next/link";
import { nav } from "@/routes";
import { useRef } from "react";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ACTIVE_LINK_CONST = 8;

export default function NavDesktop() {
  const pathname = usePathname();

  const activeLinkRef = useRef<HTMLAnchorElement>(null);
  const [barStyle, setBarStyle] = useState({
    width: activeLinkRef.current?.offsetWidth ?? 0,
    left: activeLinkRef.current?.offsetLeft ?? 0,
  });

  useEffect(() => {
    if (activeLinkRef.current) {
      const { offsetWidth, offsetLeft } = activeLinkRef.current;
      setBarStyle({ width: offsetWidth, left: offsetLeft });
    }
  }, [pathname]);

  return (
    <nav className="relative z-30 flex h-16 self-center">
      <div
        className={cn(
          "absolute bottom-2 h-1 rounded bg-accent transition-all duration-300",
        )}
        style={{
          width: barStyle.width - ACTIVE_LINK_CONST * 2,
          left: barStyle.left + ACTIVE_LINK_CONST,
        }}
      />
      {nav.map((data) => (
        <Link
          key={data.href}
          href={data.href}
          ref={pathname === data.href ? activeLinkRef : null}
          className={cn(
            "flex items-center justify-center whitespace-nowrap px-6 font-semibold",
            {
              "ml-6 rounded-lg bg-accent bg-accent/90 shadow-lg transition-transform duration-300 hover:bg-accent focus:outline-none focus:ring-4 focus:ring-accent active:scale-95":
                data.highlight,
            },
          )}
        >
          {data.label}
        </Link>
      ))}
    </nav>
  );
}
