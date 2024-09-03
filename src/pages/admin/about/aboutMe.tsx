import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Header, Loading, Sidebar } from "@/components";

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
import { Textarea } from "@/components/ui/textarea";

import { supabase } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const aboutMeSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

// Define the form data type based on the Zod schema
type AboutMeFormData = z.infer<typeof aboutMeSchema>;

const AboutMeAdmin = () => {
  const form = useForm<AboutMeFormData>({
    resolver: zodResolver(aboutMeSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const {
    formState: { errors },
  } = form;
  const [isLoading, setIsLoading] = useState(false);

  const fetchDataAboutMe = async () => {
    setIsLoading(true);
    try {
      const { data: aboutMe, error } = await supabase
        .from("aboutMe")
        .select("*")
        .maybeSingle();

      if (aboutMe) {
        form.setValue("id", aboutMe.id);
        form.setValue("title", aboutMe.title ?? "");
        form.setValue("description", aboutMe.description ?? "");
        setIsLoading(false);
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

  const onSubmit = async (record: AboutMeFormData) => {
    console.log(1);
    try {
      const { data, error } = await supabase
        .from("aboutMe")
        .update(record)
        .eq("id", record.id)
        .select();

      if (data) {
        console.log(data);
        toast("Record has been saved");
      }

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <Loading isVisible={isLoading} />
      <Header isAdmin={true} />
      <Sidebar />
      <div className="flex flex-col ml-72 mt-24 pr-8">
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
                          <Input
                            {...field}
                            type="text"
                            id="title"
                            name="title"
                          />
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
                          <FormMessage>
                            {errors.description.message}
                          </FormMessage>
                        )}
                      </>
                    )}
                  />
                </FormItem>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-1/12 mr-2 text-red-500 border-red-500"
                  >
                    Reset
                  </Button>
                  <Button type="submit" className="w-1/12">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutMeAdmin;
