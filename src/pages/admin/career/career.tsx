/* eslint-disable no-extra-boolean-cast */
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";

import {
  ConfirmationDelete,
  DataTable,
  DatePicker,
  Header,
  Loading,
  Sidebar,
} from "@/components";

import { supabase } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { toast } from "sonner";

import dayjs from "dayjs";

interface careerInput {
  title: string;
  company: string;
  dateStart?: string;
  dateEnd?: string;
}

interface RowOriginal {
  id: string;
  dateStart?: string;
  dateEnd?: string;
  // Add any other properties that `original` might have
}

const careerSchema = z.object({
  title: z.string().min(1),
  company: z.string().optional(),
  dateStart: z.string().optional(),
  dateEnd: z.string().optional(),
});

// Define the form data type based on the Zod schema
type CareerFormData = z.infer<typeof careerSchema>;

const CareerAdmin = () => {
  const [dataCareer, setDataCareer] = useState<unknown[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recordID, setRecordID] = useState<string>("");
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<careerInput>({
    title: "",
    company: "",
  });

  const fetchCareers = async () => {
    setIsLoading(true);
    try {
      const { data: careers, error } = await supabase
        .from("career")
        .select("*");

      if (careers) {
        setIsLoading(false);
        setDataCareer(careers);
      } else if (error) {
        console.log("err", error);
        setIsLoading(false);
        toast(error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const onDelete = async () => {
    setIsLoading(true);
    setIsDelete(false);
    try {
      const response = await supabase
        .from("career")
        .delete()
        .eq("id", recordID);

      if (response.status == 204) {
        setRecordID("");
        setIsLoading(false);
        fetchCareers();
        toast("Record has been deleted");
      } else {
        setIsLoading(false);
        toast(response.error?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (record: CareerFormData) => {
    setOpenForm(false);
    setIsLoading(true);

    try {
      if (!!recordID) {
        const { data, error } = await supabase
          .from("career")
          .update(record)
          .eq("id", recordID)
          .select();

        if (data) {
          setRecordID("");

          setDataEdit({ title: "", company: "", dateStart: "", dateEnd: "" });
          setIsLoading(false);
          fetchCareers();
          toast("Record has been saved");
        }

        if (error) {
          setIsLoading(false);
          console.log(error);
          toast(error.message);
        }
      } else {
        const response = await supabase.from("career").insert(record);

        if (response.status == 201) {
          setIsLoading(false);
          fetchCareers();
          toast("Record has been saved", { className: "text-green-500" });
        }

        if (!!response.error) {
          setIsLoading(false);
          console.log(response.statusText);
          toast(response.error.message);
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
      accessorKey: "company",
      header: () => <div className="text-left">Company</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">{row.getValue("company")}</div>
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

                  setDataEdit({
                    title: row.getValue("title"),
                    company: row.getValue("company"),
                    dateStart: (row.original as RowOriginal).dateStart,
                    dateEnd: (row.original as RowOriginal).dateEnd,
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
    const form = useForm<CareerFormData>({
      resolver: zodResolver(careerSchema),
      defaultValues: {
        title: dataEdit.title,
        company: dataEdit.company,
        dateStart: dataEdit.dateStart,
        dateEnd: dataEdit.dateEnd,
      },
    });
    const {
      formState: { errors },
    } = form;

    const [dateEnd, setDateEnd] = useState<string | undefined>(
      dataEdit.dateStart
    );
    const [dateStart, setDateStart] = useState<string | undefined>(
      dataEdit.dateEnd
    );

    const handleClose = () => {
      form.reset();
      setOpenForm(false);
      setRecordID("");
      setDataEdit({ title: "", company: "" });
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
                  name="company"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="company">Company</Label>
                      <FormControl>
                        <Input {...field} type="text" id="company" />
                      </FormControl>
                      {errors.company && (
                        <FormMessage>{errors.company.message}</FormMessage>
                      )}
                    </>
                  )}
                />
              </FormItem>

              <FormItem className="text-left">
                <FormField
                  name="dateStart"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <Label htmlFor="dateStart" className="mb-3">
                        DateStart
                      </Label>
                      <FormControl>
                        <DatePicker
                          {...field}
                          value={dateStart}
                          onValueChange={(e: Date | undefined) => {
                            setDateStart(dayjs(e).format("YYYY-MM-DD"));
                            field.onChange(dayjs(e).format("YYYY-MM-DD"));
                          }}
                        />
                      </FormControl>
                      {errors.dateStart && (
                        <FormMessage>{errors.dateStart.message}</FormMessage>
                      )}
                    </div>
                  )}
                />
              </FormItem>

              <FormItem className="text-left">
                <FormField
                  name="dateEnd"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <Label htmlFor="dateEnd" className="mb-3">
                        DateEnd
                      </Label>
                      <FormControl>
                        <DatePicker
                          {...field}
                          value={dateEnd}
                          onValueChange={(e: Date | undefined) => {
                            setDateEnd(dayjs(e).format("YYYY-MM-DD"));
                            field.onChange(dayjs(e).format("YYYY-MM-DD"));
                          }}
                        />
                      </FormControl>
                      {errors.dateEnd && (
                        <FormMessage>{errors.dateEnd.message}</FormMessage>
                      )}
                    </div>
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
        <DataTable data={dataCareer} columns={columns} searchBy="title" />
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

export default CareerAdmin;
