import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: addNewCabin, isLoading: isCreating } = useMutation({
    mutationFn: addEditCabin,
    onSuccess: () => {
      toast.success('Successfully add new cabin');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: err => {
      toast.error(err.message);
    },
  });
  return { isCreating, addNewCabin };
}
