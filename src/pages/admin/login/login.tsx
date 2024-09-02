import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

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
import { toast } from "sonner";

import { supabase } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// Define the schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Define the form data type based on the Zod schema
type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const {
    formState: { errors },
  } = form;

  const onSubmit = async (user: LoginFormData) => {
    try {
      const { email, password } = user;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("res", data);
      if (data.session) {
        Cookies.set("token", data.session.access_token);
        navigate("/admin");
      }

      if (error || !data.session) {
        console.log("err", error);
        toast("Error Login", {
          description: "Invalid Login or Password",
          classNames: { error: "" },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-[600px]">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormItem>
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input {...field} type="email" id="email" />
                      </FormControl>
                      {errors.email && (
                        <FormMessage>{errors.email.message}</FormMessage>
                      )}
                    </>
                  )}
                />
              </FormItem>

              <FormItem>
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="password">Password</Label>
                      <FormControl>
                        <Input {...field} type="password" id="password" />
                      </FormControl>
                      {errors.password && (
                        <FormMessage>{errors.password.message}</FormMessage>
                      )}
                    </>
                  )}
                />
              </FormItem>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginForm;
