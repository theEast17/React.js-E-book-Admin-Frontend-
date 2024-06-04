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
import { loginData } from "@/http/api";
import { loginSchema } from "@/schema";
import useTokenStore from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";


const LoginPage = () => {
  const navigate=useNavigate()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setToken=useTokenStore((state)=>state.setToken)

  const mutation=useMutation({
    mutationFn:loginData,
    onSuccess:(response)=>{
      setToken(response.data.accessToken)
      navigate('/dashboard')
    }
  })



  function onSubmit(values: z.infer<typeof loginSchema>) {
    const {email,password}=values
    mutation.mutate({email,password})

  }

  return (
    <section className="h-screen w-full flex justify-center items-center bg-slate-300" >
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white space-y-4 rounded-xl p-6 shadow-custom "  >
          <h1 className="text-2xl font-bold">Login</h1>

          {mutation.isError && (
            <span className="text-red-500 font-semibold text-sm">{mutation.error.response.data.message}</span>
          )}

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

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
           
            Submit
            {mutation.isPending && <LoaderCircle className="animate-spin ml-2 text-slate-400"/>}
            </Button>
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
