import { useEffect, useState } from "react";

import { Element } from "react-scroll";

import About from "../about/about";
import Loading from "../loading/loading";

import dayjs from "dayjs";

import { supabase } from "@/lib/utils";

interface careerProps {
  id: number;
  title: string;
  company: string;
  dateStart?: Date;
  dateEnd?: Date;
}

const Career = () => {
  const [dataCareer, setDataCareer] = useState<careerProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCareers = async () => {
    setIsLoading(true);
    try {
      const { data: career, error } = await supabase.from("career").select("*");

      if (career) {
        setDataCareer(career);
        setIsLoading(false);
      } else if (error) {
        console.log("err", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash === "#about") {
      const element = document.getElementById("about");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    fetchCareers();
  }, []);

  return (
    <Element
      name="about"
      className="w-full max-w-none container p-4 pt-20 mx-auto bg-white dark:bg-gray-900 "
    >
      <Loading isVisible={isLoading} />
      <div className="flex flex-row pl-20 pr-20 min-[768]:pl-1 min-[768]:pr-1">
        <About />
        <div className="w-1/3 ml-40 md:w-full max-[768]:w-full">
          {dataCareer.map((item, index) => (
            <div className="flex" key={item.id}>
              <div className="mr-4 flex flex-col items-center">
                <div>
                  {!item.dateEnd ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900 bg-blue-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-white dark:text-slate-200"
                      >
                        <path d="M5 12l5 5l10 -10"></path>
                      </svg>
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-blue-800 dark:text-slate-200"
                      >
                        <path d="M12 5l0 14"></path>
                        <path d="M18 13l-6 6"></path>
                        <path d="M6 13l6 6"></path>
                      </svg>
                    </div>
                  )}
                </div>
                {dataCareer.length != index + 1 && (
                  <div className="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
                )}
              </div>
              <div className="pt-1 pb-8 text-left">
                <p className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">
                  {item.title}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  {item.company}
                </p>
                <p className="italic text-xs text-gray-600 dark:text-slate-400">
                  {`${dayjs(item.dateStart).format("MMM YYYY")} - ${
                    !item.dateEnd
                      ? "Now"
                      : dayjs(item.dateEnd).format("MMM YYYY")
                  }`}{" "}
                  {/* {dayjs(item.dateEnd ?? dayjs()).diff(
                dayjs(item.dateStart),
                "months"
              )} */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="flex">
        <div className="mr-4 flex flex-col items-center">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900 bg-blue-900"></div>
          </div>
        </div>
      </div> */}
    </Element>
  );
};

export default Career;
