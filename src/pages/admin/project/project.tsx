import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

import { DataTable, Header, MultiSelector, Sidebar } from "@/components";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { supabase } from "@/lib/utils";

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  stacks: z.string().optional(),
});

interface projectProps {
  title: string;
  description?: string;
  stacks: string[];
}

// Define the form data type based on the Zod schema
type ProjectFormData = z.infer<typeof projectSchema>;

const ProjectAdmin = () => {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });
  const {
    formState: { errors },
  } = form;
  const [dataProject, setDataProject] = useState<projectProps[]>([]);
  const [dataStacks, setDataStacks] = useState<string[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);

  const fetchProjects = async () => {
    try {
      const { data: projects, error } = await supabase
        .from("project")
        .select("*");

      if (projects) {
        const stacksArray = projects.map((project) => {
          return {
            ...project,
            stacks: project.stack?.trim().split(","),
          };
        });

        setDataProject(stacksArray);
      } else if (error) {
        console.log("err", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeStacks = (val: string) => {
    if (dataStacks.includes(val)) {
      dataStacks.splice(dataStacks.indexOf(val), 1);
      setDataStacks(dataStacks.filter((item) => item !== val));
    } else {
      setDataStacks((prevValue) => [...prevValue, val]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onSubmit = async () => {};

  const columns: ColumnDef<unknown, unknown>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: unknown) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: unknown) => row.toggleSelected(!!value)}
          className="flex justify-start"
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <div className="flex flex-row">
            Title
            <ArrowUpDown
              className="ml-2 h-4 w-4"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-left">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: () => <div className="text-left">Description</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row.getValue("description")}
          </div>
        );
      },
    },
    {
      accessorKey: "stacks",
      header: () => <div className="text-left">Stacks</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-start">
            {(row.getValue("stacks") as string[]).map((o: string) => (
              <Badge className="mr-1 align-middle items-center">{o}</Badge>
            ))}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-left">Actions</div>,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex justify-center">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setOpenForm(true);
                  setDataStacks(row.getValue("stacks"));
                  form.setValue("title", row.getValue("title"));
                  form.setValue("description", row.getValue("description"));
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const FormDialog = () => {
    return (
      <Dialog open={openForm} onOpenChange={() => setOpenForm(false)}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{form.getValues("title")}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <FormItem className="text-left">
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="title">Job Title</Label>
                      <FormControl>
                        <Input {...field} type="text" id="title" />
                      </FormControl>
                      {errors.title && (
                        <FormMessage>{errors.title.message}</FormMessage>
                      )}
                    </>
                  )}
                />
              </FormItem>

              <FormItem className="text-left">
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="description">Description</Label>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message here."
                          id="description"
                          {...field}
                          rows={10}
                        />
                      </FormControl>
                      {errors.description && (
                        <FormMessage>{errors.description.message}</FormMessage>
                      )}
                    </>
                  )}
                />
              </FormItem>

              <FormItem className="text-left">
                <FormField
                  name="stacks"
                  control={form.control}
                  render={() => (
                    <>
                      <Label htmlFor="stacks" className="mr-4">
                        Stacks
                      </Label>
                      <FormControl>
                        <MultiSelector
                          value={dataStacks}
                          onValueChange={handleOnChangeStacks}
                        />
                      </FormControl>
                      {errors.description && (
                        <FormMessage>{errors.description.message}</FormMessage>
                      )}
                    </>
                  )}
                />
              </FormItem>

              <Button type="submit" className="flex justify-start">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="w-full">
      <Header isAdmin={true} />
      <Sidebar />
      <div className="flex flex-col ml-72 mt-24 pr-8">
        <div className="w-full">
          <Button className="w-1/6 flex ml-auto">Add New</Button>
        </div>
        <DataTable data={dataProject} columns={columns} searchBy={"title"} />
        {openForm && <FormDialog />}
      </div>
    </div>
  );
};

export default ProjectAdmin;
