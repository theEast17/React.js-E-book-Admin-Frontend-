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
import { editBooks, getBookById } from "@/http/api";
import { bookSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";


interface Book {
  title: string;
  genre: string;
  description: string;
  coverImage?: FileList;
  file?: FileList;
}

interface GetBookByIdResponse {
  data: Book;
}

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data } = useQuery<GetBookByIdResponse>({
    queryKey: ["book", id],
    queryFn: () => getBookById(id!),
  });
  

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      Title: '',
      Genre: '',
      Description: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        Title: data.data.title,
        Genre: data.data.genre,
        Description: data.data.description,
      });
    }
  }, [data, form]);

  const coverImageRef = form.register("CoverImage");
  const PdfRef = form.register("BookPdf");

  const mutation = useMutation({
    mutationFn: editBooks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigate("/dashboard/books");
    },
  });

  async function onSubmit(values: z.infer<typeof bookSchema>) {
    const formData = new FormData();
    formData.append("title", values.Title);
    formData.append("genre", values.Genre);
    formData.append("description", values.Description);
    if (values.CoverImage[0]) {
      formData.append("coverImage", values.CoverImage[0]);
    }
    if (values.BookPdf[0]) {
      formData.append("file", values.BookPdf[0]);
    }

    mutation.mutate({ id:id!, data: formData });
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
              <BreadcrumbPage>Update</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Update a Book</CardTitle>
          <CardDescription>
            Fill out the form below to update a book.
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
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...coverImageRef}
                        autoComplete="off"
                      />
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
                className="ml-4"
                onClick={() => navigate("/dashboard/books")}
              >
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Cancel
                </span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default EditBook;
