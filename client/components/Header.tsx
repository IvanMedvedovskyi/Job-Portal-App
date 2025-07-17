"use client";

import { useGlobalContext } from "@/context/globalContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, UserPlus } from "lucide-react";
import React from "react";
import Profile from "./Profile";


const Header = () => {
  const pathname = usePathname();
  const { isAuth } = useGlobalContext();

  return (
    <header className="py-6 px-10 flex justify-between items-center bg-slate-100 text-gray-500">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"/logo.svg"} alt="logo" width={45} height={45} />
        <h1 className="font-extrabold text-2xl text-purple-500 hover:bg-purple-500/10 transition-all duration-200 ease-in-out">
          Job Finder Application
        </h1>
      </Link>

      <ul className="flex gap-5 items-center">
        <li>
          <Link
            href={"/findwork"}
            className={`py-2 px-6 rounded-md ${
              pathname === "/findwork"
                ? "text-indigo-500 border border-indigo-500 bg-indigo-500/10"
                : ""
            }`}
          >
            Find Work
          </Link>
        </li>
        <li>
          <Link
            href={"/myjobs"}
            className={`py-2 px-6 rounded-md ${
              pathname === "/myjobs"
                ? "text-indigo-500 border border-indigo-500 bg-indigo-500/10"
                : ""
            }`}
          >
            My Jobs
          </Link>
        </li>
        <li>
          <Link
            href={"/post"}
            className={`py-2 px-6 rounded-md ${
              pathname === "/post"
                ? "text-indigo-500 border border-indigo-500 bg-indigo-500/10"
                : ""
            }`}
          >
            Post a Job
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        {isAuth ? (
          <Profile />
        ) : (
          <div className="flex items-center gap-6">
            <Link
              href={"http://localhost:8000/login"}
              className="py-2 px-6 rounded-md border flex items-center gap-4 bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-600 transition-all duration-200 ease-in-out"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              href={"http://localhost:8000/login"}
              className="py-2 px-6 rounded-md border flex items-center gap-4 border-indigo-500 text-indigo-500 hover:bg-indigo-500/10 transition-all duration-200 ease-in-out"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
