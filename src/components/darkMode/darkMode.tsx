import React from "react";
import { useDarkMode } from "../../context/darkModeContext";

import { HiOutlineSun } from "react-icons/hi2";
import { IoIosMoon } from "react-icons/io";

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="container-switch">
      <a style={{ cursor: "pointer" }} onClick={toggleDarkMode}>
        {darkMode ? (
          <IoIosMoon size={48} color="white" />
        ) : (
          <HiOutlineSun size={52} color="orange" />
        )}
      </a>
    </div>
  );
};

export default DarkModeToggle;
