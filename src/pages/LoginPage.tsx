import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";


const LoginPage = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
  }

  return (
    <section className="h-screen w-full flex justify-center items-center bg-slate-300" >
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white space-y-4 rounded-xl p-6 shadow-custom "  >
          <h1 className="text-2xl font-bold">Login</h1>

          <FormDescription>
            Enter your email below to login to your account.
          </FormDescription>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">Submit</Button>
          <p className="text-small-regular text-light-2 text-center mt-1">
            don't have an account?
            <Link
              to="/auth/register"
              className="text-primary-500 text-small-semibold ml-2 underline"
            >
              Register
            </Link>
          </p>
        </form>
      </Form>
    </section>
  );
};

export default LoginPage;
