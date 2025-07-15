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
} from '@/components/ui/alert-dialog';
import { logoutFn } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function Logout({ children }: { children: React.ReactNode }) {
  const { mutate } = useMutation({
    mutationFn: async () => await logoutFn(),
    onSuccess: (res) => {
      if (res?.success) {
        toast.success('Logged out successfully');
      } else {
        toast.error(res?.message || 'Logout failed. Please try again.');
      }
    },
    onError: (error) => {
      toast.error((error as Error)?.message || 'Logout failed. Please try again.');
    },
  });

  function handleLogout() {
    mutate();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to Logout?</AlertDialogTitle>
          <AlertDialogDescription>You will be logged out of your account.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} className='bg-red-500 hover:bg-red-600'>
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
