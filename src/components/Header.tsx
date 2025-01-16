"use client";
import { routes } from "@/routes";
import Logo from "./Logo";
import NavDesktop from "./Nav/NavDesktop";
import NavMobile from "./Nav/NavMobile";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="sticky top-0 z-40 box-content hidden h-32 justify-between bg-background py-4 lg:flex">
        <Link href={routes.home}>
          <Logo logoClassName="w-64" withAnimate withSub />
        </Link>
        <NavDesktop />
      </header>
      <header className="my-2 flex justify-end lg:hidden">
        <Link className="w-full" href={routes.home}>
          <Logo className="h-16" logoClassName="w-32" />
        </Link>
        <NavMobile />
      </header>
    </>
  );
};

export default Header;
