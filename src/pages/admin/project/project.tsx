/* eslint-disable no-extra-boolean-cast */
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

import {
  ConfirmationDelete,
  DataTable,
  Header,
  Loading,
  MultiSelector,
  Sidebar,
} from "@/components";

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
import { toast } from "sonner";

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  stacks: z.string().optional(),
});

interface RowOriginal {
  id: string;
  // Add any other properties that `original` might have
}

interface projectProps {
  title: string;
  description?: string;
  stacks: string[];
}

// Define the form data type based on the Zod schema
type ProjectFormData = z.infer<typeof projectSchema>;

const ProjectAdmin = () => {
  const [dataProject, setDataProject] = useState<projectProps[]>([]);
  const [dataStacks, setDataStacks] = useState<string[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recordID, setRecordID] = useState<string>("");
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<projectProps>({
    title: "",
    description: "",
    stacks: [],
  });

  const fetchProjects = async () => {
    setIsLoading(true);
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

        setDataProject(stacksArray);
        setIsLoading(false);
      } else if (error) {
        console.log("err", error);
        setIsLoading(false);
        toast(error.message);
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

  const onDelete = async () => {
    setIsLoading(true);
    setIsDelete(false);
    try {
      const response = await supabase
        .from("project")
        .delete()
        .eq("id", recordID);

      if (response.status == 204) {
        setRecordID("");
        setIsLoading(false);
        fetchProjects();
        toast("Record has been deleted");
      } else {
        setIsLoading(false);
        toast(response.error?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (record: ProjectFormData) => {
    setOpenForm(false);
    setIsLoading(true);

    try {
      if (!!recordID) {
        const { data, error } = await supabase
          .from("project")
          .update(record)
          .eq("id", recordID)
          .select();

        if (data) {
          setRecordID("");
          setDataStacks([]);
          setDataEdit({ title: "", description: "", stacks: [] });
          setIsLoading(false);
          fetchProjects();
          toast("Record has been saved");
        }

        if (error) {
          setIsLoading(false);
          console.log(error);
          toast(error.message);
        }
      } else {
        const response = await supabase.from("project").insert(record);

        if (response.status == 201) {
          setIsLoading(false);
          fetchProjects();
          toast("Record has been saved");
        }

        if (!!response.error) {
          setIsLoading(false);
          toast(response.error?.message);
          console.log(response.statusText);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="flex justify-start flex-wrap">
            {(row.getValue("stacks") as string[])?.map(
              (o: string, idx: number) => (
                <Badge
                  key={idx}
                  className="mr-1 mb-1 align-middle items-center"
                >
                  {o}
                </Badge>
              )
            )}
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
                  setDataEdit({
                    title: row.getValue("title"),
                    description: row.getValue("description"),
                    stacks: [],
                  });
                  setRecordID((row.original as RowOriginal).id);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setRecordID((row.original as RowOriginal).id);
                  setIsDelete(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const FormDialog = () => {
    const form = useForm<ProjectFormData>({
      resolver: zodResolver(projectSchema),
      defaultValues: {
        title: dataEdit.title,
        description: dataEdit.description,
      },
    });
    const {
      formState: { errors },
    } = form;

    const handleClose = () => {
      form.reset();
      setOpenForm(false);
      setRecordID("");
      setDataStacks([]);
      setDataEdit({ title: "", description: "", stacks: [] });
    };

    return (
      <Dialog open={openForm} onOpenChange={handleClose}>
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
                      <Label id="title" htmlFor="title">
                        Job Title
                      </Label>
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
                      <Label id="description" htmlFor="description">
                        Description
                      </Label>
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
                      <Label id="stacks" htmlFor="stacks" className="mr-4">
                        Stacks
                      </Label>
                      <FormControl id="stacks">
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
      <Loading isVisible={isLoading} />
      <Header isAdmin={true} />
      <Sidebar />
      <div className="flex flex-col ml-72 mt-24 pr-8">
        <div className="w-full">
          <Button
            className="w-1/6 flex ml-auto"
            onClick={() => setOpenForm(true)}
          >
            Add New
          </Button>
        </div>
        <DataTable data={dataProject} columns={columns} searchBy={"title"} />
        {openForm && <FormDialog />}
        {isDelete && (
          <ConfirmationDelete
            isVisible={isDelete}
            onClick={onDelete}
            onClose={() => setIsDelete(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectAdmin;
