import DarkModeToggle from "../darkMode/darkMode";

import { Link, animateScroll } from "react-scroll";
import { useEffect, useState } from "react";

import { IoLogOut } from "react-icons/io5";

import { dataMenu } from "@/data/menu";
import { Button } from "../ui/button";
import { supabase } from "@/lib/utils";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isAdmin?: boolean;
}

const Header = ({ isAdmin = false }: HeaderProps) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("/");

  useEffect(() => {
    window.onscroll = function () {
      const B = document.body; //IE 'quirks'
      let D = document.documentElement; //IE with doctype
      D = D.clientHeight ? D : B;

      if (D.scrollTop == 0) {
        setIsActive("/");
      }
    };
  }, []);

  const handleNavigateMenu = (menu: string) => {
    setIsActive(menu);
    if (menu === "/") animateScroll.scrollToTop();
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (!error) {
        Cookies.set("token", "");
        navigate("/admin/login");
      }

      if (error) {
        toast("Error Logout", {
          description: "Invalid Login or Password",
          classNames: { error: "" },
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0">
      <div className="relative max-w-screen-xl mx-auto p-4">
        <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex items-center">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {!isAdmin &&
              dataMenu.map((item) => (
                <li id={item.id}>
                  <Link
                    to={item.id}
                    activeClass="active"
                    smooth
                    duration={500}
                    offset={-70}
                    spy={true}
                    className={`${
                      isActive == item.id ? "text-[#4b9491]" : "#FFFFFF"
                    } hover:text-[#4b9491] cursor-pointer`}
                    activeStyle={{ color: "#4b9491" }}
                    onSetActive={() => setIsActive(item.id)}
                    onClick={() => handleNavigateMenu(item.id)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="flex justify-end items-center">
          {isAdmin && (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-32 h-10 text-[#2C3A47] dark:text-[#FFFFFF] text-lg transition-colors duration-300 ease-in-out"
            >
              <IoLogOut className="mr-2 mt-1 h-6 w-6 " /> Logout
            </Button>
          )}
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
      </div>
    </nav>
  );
};

export default Header;
