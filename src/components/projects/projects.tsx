import { dataProjects } from "@/data/projects";
import { Separator } from "../ui/separator";

const Projects = () => {
  return (
    <section className="w-full pt-20">
      <div className="flex flex-row justify-between flex-wrap mx-20">
        {dataProjects.map((item) => (
          <div className="mb-16 ml-4 w-1/5">
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">{item.title}</h4>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              {item.stack.split(",").map((o) => (
                <div>
                  <div>{o}</div>
                  <Separator orientation="vertical" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
