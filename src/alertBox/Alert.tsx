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
      <AlertDialogTrigger className="w-full">
      <p className="border-0 p-2 rounded-lg w-full outline-none hover:bg-muted transition-all">Delete</p>
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
