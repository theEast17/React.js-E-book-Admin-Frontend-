import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBooks } from "@/http/api";
import { bookSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const CreateBook = () => {
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      Title: "",
      Genre: "",
      Description: "",
    },
  });

  const navigate=useNavigate()
  const coverImageRef=form.register('CoverImage')
  const PdfRef=form.register('BookPdf')

  const queryClient=useQueryClient()
  const {toast}=useToast()

  const mutation = useMutation({
    mutationFn: createBooks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      navigate('/dashboard/books')
    },
  });

  async function onSubmit(values: z.infer<typeof bookSchema>) {
    // const {Title,Genre,Description,CoverImage,BookPdf}=values;
    const formdata = new FormData();
    formdata.append('title', values.Title);
    formdata.append('genre', values.Genre);
    formdata.append('description', values.Description);
    formdata.append('coverImage', values.CoverImage[0]);
    formdata.append('file', values.BookPdf[0]);

    mutation.mutate(formdata);

    toast({
      description:'added book'
    })

    console.log(values)
  }


  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

      </div>

      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Books</CardTitle>
          <CardDescription>
            Fill out the form below to create a new book.
          </CardDescription>
        </CardHeader>
        <hr />

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-white space-y-4 mt-2"
            >
              <FormField
                control={form.control}
                name="Title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter book title"
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
                name="Genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter type of book"
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
                name="Description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter book Description"
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
                name="CoverImage"
                render={() => (
                  <FormItem>
                    <FormLabel>CoverImage</FormLabel>
                    <FormControl>
                      <Input type="file" {...coverImageRef} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="BookPdf"
                render={() => (
                  <FormItem>
                    <FormLabel>Book PDF</FormLabel>
                    <FormControl>
                      <Input type="file" {...PdfRef} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={mutation.isPending}>
                Submit
                {mutation.isPending && (
                  <LoaderCircle className="animate-spin ml-2 text-slate-400" />
                )}
              </Button>

              <Button
            variant={"outline"}
            className=" ml-4"
            onClick={() => navigate("/dashboard/books")}
          >
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Cancle
            </span>
          </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateBook;
