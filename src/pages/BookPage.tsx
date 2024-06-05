import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { getBooks } from "@/http/api";
import { SkeletonDemo } from "@/skeleton/Skeleton";
import { Book } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal, PlusCircle } from "lucide-react";

const BookPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    staleTime: 10000,
  });


  function formatDate(dateString:string) {
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
  
    const formattedTime = date.toLocaleTimeString('en-US', options);
  
    return `${formattedTime}`;
  }


  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Books</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>

      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">

            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>

           {isError ? <h1 className="text-center text-red-500">Error while fetching books.</h1> : <CardContent>
             {isLoading ? <SkeletonDemo/> : <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Author Name
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="hide-scrollbar">
                  {data?.data?.map((book: Book) => (
                    <TableRow key={book._id}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt={book.title}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={book.coverImage}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium capitalize">
                        {book.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{book.genre}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {book.author?.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {
                        formatDate(book.createdAt)
                        }
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>}
            </CardContent>}

           {!isLoading && <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-5</strong> of <strong>{data?.data.length}</strong> products
              </div>
            </CardFooter>}
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default BookPage;
