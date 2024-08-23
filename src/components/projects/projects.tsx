import { dataProjects } from "@/data/projects";
import { Separator } from "../ui/separator";
import { Element } from "react-scroll";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <Element name="projects" className="w-full pt-20">
      <div className="flex flex-row justify-between flex-wrap mx-20">
        {dataProjects.map((item) => (
          <Link
            to=""
            // key={item.title}
            className="mb-16 ml-4 w-1/5 hover:scale-x-105 hover:scale-y-105"
            key={item.title}
          >
            <img
              src="https://placehold.co/500x300?text=Hello+World"
              className="rounded-sm"
            />
            <div className="space-y-1 text-left mt-5">
              <h4 className="text-xl font-medium leading-none">{item.title}</h4>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 -mt-3 text-sm">
              {item.stack.split(",").map((o, i) => (
                <div key={i}>
                  <div>{o}</div>
                  <Separator orientation="vertical" />
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </Element>
  );
};

export default Projects;
