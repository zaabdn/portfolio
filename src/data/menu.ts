export const dataMenu = [
  {
    id: "/",
    title: "Home",
    isAdmin: false,
  },
  {
    id: "about",
    title: "About",
    isAdmin: false,
  },
  {
    id: "portfolio",
    title: "Portfolio",
    isAdmin: false,
  },
  {
    id: "contact",
    title: "Contact",
    isAdmin: false,
  },
];

import { TbHomeFilled } from "react-icons/tb";
import { FaBook } from "react-icons/fa6";
import { RiProfileFill } from "react-icons/ri";
import { GrProjects } from "react-icons/gr";

export const dataMenuSidebar = [
  {
    id: "/admin",
    title: "Dashboard",
    icon: TbHomeFilled,
  },
  {
    id: "/admin/career",
    title: "Career",
    icon: FaBook,
  },
  {
    id: "/admin/aboutme",
    title: "About Me",
    icon: RiProfileFill,
  },
  {
    id: "/admin/project",
    title: "Project",
    icon: GrProjects,
  },
];
