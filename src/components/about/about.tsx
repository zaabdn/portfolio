import { dataAbout } from "@/data/about";
import { Badge } from "../ui/badge";
import { colors } from "@/assets/colors";
import { supabase } from "@/lib/utils";
import { useEffect, useState } from "react";

interface dataProps {
  title: string;
  description: string;
  description2?: string;
}

const About = () => {
  const [data, setData] = useState<dataProps>({
    title: "",
    description: "",
  });

  const fetchDataAboutMe = async () => {
    try {
      const { data: aboutMe, error } = await supabase
        .from("aboutMe")
        .select("*")
        .maybeSingle();

      if (aboutMe) {
        const data = aboutMe.description.split("<br/>");
        aboutMe.description = data[0];
        aboutMe.description2 = data[1];

        setData(aboutMe);
      } else if (error) {
        console.log("err", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataAboutMe();
  }, []);

  return (
    <div className="w-1/2 md:w-full">
      <h2 className="font-heading dark:text-gray-100 mb-4 text-left text-3xl font-bold lg:text-4xl">
        Get to know me
      </h2>

      <div>
        <h2 className="mt-10 mr-20 mb-4 scroll-m-20 text-xl font-normal tracking-tight transition-colors first:mt-0 text-left dark:text-[#FFFFFF]">
          {data.description}
          <br />
          <br />
          {data.description2}
        </h2>
        <div className="text-left">
          {dataAbout.skills.split(",").map((item, i) => (
            <Badge key={i} className={`mr-2 text-lg dark:bg-[${colors.white}]`}>
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
