import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteBooks } from "@/http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AlertProps {
    bookId: string;
  }

const Alert = ({bookId}:AlertProps) => {
    const navigate=useNavigate()
    const queryClient=useQueryClient()

    const mutation = useMutation({
      mutationFn: deleteBooks,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['books'] })
      },
    })
    const handleDeleteBook=(id:string)=>{
        mutation.mutate(id)
    }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="border-0 w-full outline-none hover:bg-muted transition-all">
      <Button variant={'ghost'} className="w-full text-zinc-600 font-normal">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=>navigate('/dashboard/books')}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>handleDeleteBook(bookId)}>
            Continue
            {mutation.isPending && (
             'Deleting...' + <LoaderCircle className="animate-spin ml-2 text-slate-400" />
            )}
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
