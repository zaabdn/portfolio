import React from "react";

import { HiOutlineSun } from "react-icons/hi2";
import { IoIosMoon } from "react-icons/io";
import { useTheme } from "../theme/theme-provider";

const DarkModeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="container-switch">
      <a
        style={{ cursor: "pointer" }}
        onClick={() => setTheme(theme == "light" ? "dark" : "light")}
      >
        {theme == "dark" ? (
          <IoIosMoon size={48} color="white" />
        ) : (
          <HiOutlineSun size={52} color="orange" />
        )}
      </a>
    </div>
  );
};

export default DarkModeToggle;
