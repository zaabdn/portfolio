import { useEffect, useState } from "react";

import { Element } from "react-scroll";
import { Link } from "react-router-dom";

import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

import { supabase } from "@/lib/utils";

interface projectProps {
  title: string;
  description?: string;
  stacks: string[];
}

const Projects = () => {
  const [dataProjects, setDataProjects] = useState<projectProps[]>([]);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<projectProps>({
    title: "",
    description: "",
    stacks: [],
  });

  const fetchProjects = async () => {
    try {
      const { data: projects, error } = await supabase
        .from("project")
        .select("*");

      if (projects) {
        const stacksArray = projects?.map((project) => {
          return {
            ...project,
            stacks: project.stack?.trim().split(","),
          };
        });

        setDataProjects(stacksArray);
      } else if (error) {
        console.log("err", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpen = () => {
    setOpenDetail(!openDetail);
  };

  const DialogDetail = () => {
    return (
      <Dialog open={openDetail} onOpenChange={handleOpen}>
        <DialogContent className="sm:max-w-[800px] h-screen">
          <DialogHeader>
            <DialogTitle>{""}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-screen w-full pb-20">
            <div>
              <div className="flex flex-row justify-between">
                <img
                  src="https://placehold.co/210x70?text=Hello+World"
                  className="rounded-sm"
                />
                <img
                  src="https://placehold.co/210x70?text=Hello+World"
                  className="rounded-sm"
                />
                <img
                  src="https://placehold.co/210x70?text=Hello+World"
                  className="rounded-sm"
                />
              </div>
              <div className="flex flex-row justify-between mt-10 mb-10">
                <img
                  src="https://placehold.co/210x70?text=Hello+World"
                  className="rounded-sm"
                />
                <img
                  src="https://placehold.co/210x70?text=Hello+World"
                  className="rounded-sm"
                />
                <img
                  src="https://placehold.co/210x70?text=Hello+World"
                  className="rounded-sm"
                />
              </div>
              <div className="flex flex-row justify-between">
                <img
                  src="https://placehold.co/210x70?text=Hello+World"
                  className="rounded-sm"
                />
                <img
                  src="https://placehold.co/210x70?text=Hello+World"
                  className="rounded-sm"
                />
                <img
                  src="https://placehold.co/210x70?text=Hello+World"
                  className="rounded-sm"
                />
              </div>
            </div>
            <div className="space-y-1 mt-6">
              <h2 className="text-3xl font-medium leading-none">
                {dataDetail.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {dataDetail.description}
              </p>
            </div>
            <div className="flex h-5 items-center space-x-4 mt-3 text-sm">
              {dataDetail.stacks.map((o: string, i: number) => (
                <div key={i} className="flex flex-row">
                  <Badge className="mr-1">{o}</Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Element name="projects" className="w-full pt-20">
      <div
        className="grid grid-cols-4 gap-4 mx-20"
        style={{ gridAutoRows: "minmax(100px, auto)" }}
      >
        {dataProjects.map((item) => (
          <Link
            to=""
            key={item.title}
            className="mb-16 hover:scale-x-105 hover:scale-y-105"
            onClick={() => {
              handleOpen();
              setDataDetail(item);
            }}
          >
            <img
              src="https://placehold.co/500x300?text=Hello+World"
              className="rounded-sm"
            />
            <div className="space-y-1 text-left mt-5">
              <h4 className="text-xl font-medium leading-none">{item.title}</h4>
              <p className="text-sm text-muted-foreground">
                {!!item.description && item.description.length > 100
                  ? item.description?.slice(0, 100) + "..."
                  : item.description}
              </p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 -mt-3 text-sm">
              {item.stacks.map((o: string, i: number) => (
                <div key={i}>
                  <div>{o}</div>
                  <Separator orientation="vertical" />
                </div>
              ))}
            </div>
          </Link>
        ))}
        {openDetail && <DialogDetail />}
      </div>
    </Element>
  );
};

export default Projects;
