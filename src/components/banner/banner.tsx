import { useState } from "react";

import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";

import { colors } from "@/assets/colors";

import { useTheme } from "../theme/theme-provider";

const Banner = () => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState("");
  const color = theme == "light" ? "#2f4858" : "#ffffff";

  const iconStyles = (color: string, secondColor: string, type: string) => {
    return {
      color: isHovered === type ? secondColor : color,
      transition: "color 0.6s ease",
    };
  };

  return (
    <section className="flex w-full min-h-screen mt-10 items-center py-20 dark:bg-gray-900">
      <div className="py-10 px-4 mx-auto text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Hi, I am Zainal Abidin
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          A Software Engineer
        </p>
        <div className="flex space-y-0 flex-row justify-center items-center">
          <a
            href="https://linkedin.com/in/zainal-abidin-08/"
            target="_blank"
            onMouseEnter={() => setIsHovered("linkedin")}
            onMouseLeave={() => setIsHovered("")}
          >
            <FaLinkedin
              size={44}
              style={iconStyles(color, colors.third, "linkedin")}
            />
          </a>
          <a
            href="https://twitter.com/zaabdn"
            className="mx-1"
            onMouseEnter={() => setIsHovered("twitter")}
            onMouseLeave={() => setIsHovered("")}
          >
            <FaSquareXTwitter
              size={44}
              style={iconStyles(color, colors.third, "twitter")}
            />
          </a>
          <a
            href="https://github.com/zaabdn"
            target="_blank"
            onMouseEnter={() => setIsHovered("github")}
            onMouseLeave={() => setIsHovered("")}
          >
            <FaGithubSquare
              size={44}
              style={iconStyles(color, colors.third, "github")}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
