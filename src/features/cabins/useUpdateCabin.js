import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabin, id }) => addEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success('Successfully update cabin');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: err => {
      toast.error(err.message);
    },
  });
  return { updateCabin, isUpdating };
}
