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
import { registerData } from "@/http/api";
import { registerSchema } from "@/schema";
import useTokenStore from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const RegisterPage = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: registerData,
    onSuccess: (response) => {
      setToken(response.data.accessToken);
      navigate("/auth/login");
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const { name, email, password } = values;
    mutation.mutate({ name, email, password });
  }

  return (
    <section className="h-screen w-full flex justify-center items-center bg-slate-300">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white space-y-4 rounded-xl p-6 shadow-custom "
        >
          <h1 className="text-2xl font-bold">Sign Up</h1>
          {mutation.isError && (
            <span className="text-red-500 font-semibold text-sm">
              {mutation.error.response.data.message}
            </span>
          )}

          <FormDescription>
            Enter your information below to create account.
          </FormDescription>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username"
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

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            Submit
            {mutation.isPending && (
              <LoaderCircle className="animate-spin ml-2 text-slate-400" />
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-1">
            already have an account?
            <Link
              to="/auth/login"
              className="text-primary-500 text-small-semibold ml-2 underline"
            >
              login
            </Link>
          </p>
        </form>
      </Form>
    </section>
  );
};

export default RegisterPage;
