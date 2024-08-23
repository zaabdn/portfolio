import DarkModeToggle from "../darkMode/darkMode";

import { Events, Link, animateScroll, scrollSpy } from "react-scroll";
import { useEffect, useState } from "react";

const Header = () => {
  const [isActive, setIsActive] = useState("/");

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            {/* Flowbite */}
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <DarkModeToggle />
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                onClick={() => {
                  setIsActive("/");
                  animateScroll.scrollToTop();
                }}
                activeClass="active"
                to="/"
                className={`${
                  isActive == "/" ? "text-[#4b9491]" : "#FFFFFF"
                } hover:text-[#4b9491] cursor-pointer`}
                activeStyle={{ color: "#4b9491" }}
                onSetActive={() => setIsActive("/")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                smooth
                duration={500}
                offset={-70}
                spy={true}
                to="about"
                className={`${
                  isActive == "about" ? "text-[#4b9491]" : "#FFFFFF"
                } hover:text-[#4b9491] cursor-pointer`}
                activeStyle={{ color: "#4b9491" }}
                onSetActive={() => setIsActive("about")}
                onClick={() => setIsActive("about")}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                smooth
                duration={500}
                offset={-70}
                spy={true}
                to="about"
                className="hover:text-[#4b9491] cursor-pointer"
                activeStyle={{ color: "#4b9491" }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
