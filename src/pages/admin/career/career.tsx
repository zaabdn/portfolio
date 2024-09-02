import { useEffect, useState } from "react";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { DatePicker, Header, Sidebar } from "@/components";
import { supabase } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
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

interface careerInput {
  title: string;
  company: string;
  dateStart?: Date;
  dateEnd?: Date;
}

const careerSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1, "Password must be at least 6 characters"),
  dateStart: z.date().optional(),
  dateEnd: z.date(),
});

// Define the form data type based on the Zod schema
type CareerFormData = z.infer<typeof careerSchema>;

const CareerAdmin = () => {
  const form = useForm<CareerFormData>({
    resolver: zodResolver(careerSchema),
  });
  const {
    control,
    formState: { errors },
  } = form;

  const { append, remove, fields } = useFieldArray({
    control,
  });

  const [dataCareer, setDataCareer] = useState<unknown[]>([]);
  const [dateStart, setDateStart] = useState<Date>();

  const fetchCareers = async () => {
    try {
      const { data: career, error } = await supabase.from("career").select("*");

      if (career) {
        setDataCareer(career);
      } else if (error) {
        console.log("err", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetchCareers();
  }, []);

  const onSubmit = async (data: CareerFormData) => {
    console.log(data);
    // try {
    //   const { data: careers, error } = await supabase
    //     .from("career")
    //     .insert(data)
    //     .select();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="w-full">
      <Header isAdmin={true} />
      <Sidebar />
      <div className="flex flex-col ml-72 mt-24 pr-8">
        <div className="w-full">
          <Button className="w-1/6 flex ml-auto">Add New</Button>
        </div>
        {dataCareer.map((item) => (
          <Card className="w-full flex mt-10">
            <CardContent className="w-full flex mt-10">
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
                              onValueChange={(e: Date | undefined) =>
                                setDateStart(e)
                              }
                            />
                          </FormControl>
                          {errors.dateStart && (
                            <FormMessage>
                              {errors.dateStart.message}
                            </FormMessage>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CareerAdmin;
