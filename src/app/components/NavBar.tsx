"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const Navbar = ({
  isAuthenticated,
  user,
}: {
  isAuthenticated: boolean;
  user: KindeUser | null;
}) => {
  return (
    <section
      id="navbar"
      className="w-full fixed z-[9999] bg-primary-grey text-gray text-lg tracking-wide"
    >
      <div className="md:container relative py-10 xl:py-4 ">
        <div className="flex items-center justify-between px-8">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-[1.5rem] md:text-[2rem] xl:text-3xl">
              <Link href="/">
                Adaptics
              </Link>
            </h1>
          </div>
          <div className="navbar-desktop lg:flex lg:items-center lg:gap-16">
            <ul className="flex items-center gap-8 text-[1rem]">
              <li className="el">
                <Link href="#services">Services</Link>
                <div className="indicator"></div>
              </li>
              <li className="el">
                <Link href="#prices">Prices</Link>
                <div className="indicator"></div>
              </li>
              <li className="el">
                <Link href={"#"}>
                  About us
                </Link>
                <div className="indicator"></div>
              </li>
            </ul>
            <ul className="flex flex-col items-center lg:flex-row lg:gap-8">
              {!isAuthenticated ? (
                <>
                  <li>
                    <button className="btn btn-outline border text-[#686868] border-[#686868]">
                      <LoginLink>Login</LoginLink>
                    </button>
                  </li>
                  <li>
                    <button className="btn btn-primary">
                      <RegisterLink>Sign up</RegisterLink>
                    </button>
                  </li>
                </>
              ) : (
                <li className="flex flex-col justify-center items-center text-center">
                  
                    <div className="rounded-full bg-primary text-white py-4 px-5">
                      {user?.family_name?.[0]}
                      {user?.given_name?.[0]}
                    </div>
                  
                  <div>
                    <LogoutLink className="text-[0.85rem]">Log out</LogoutLink>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;