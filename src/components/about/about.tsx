import { dataAbout } from "@/data/about";
import { Badge } from "../ui/badge";

const About = () => {
  return (
    <div className="w-1/2">
      <div>
        <h2 className="mt-10 mr-20 mb-4 scroll-m-20 text-xl font-semibold tracking-tight transition-colors first:mt-0 text-left dark:text-[#FFFFFF]">
          {dataAbout.description}
          <br />
          <br />
          {dataAbout.description2}
        </h2>
        <div className="text-left">
          {dataAbout.skills.split(",").map((item) => (
            <Badge className="mr-2 text-lg bg-[#2f4858] dark:bg-[#74ba9e]">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
