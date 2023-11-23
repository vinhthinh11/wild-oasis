import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabins as delteCabinAPI } from '../../services/apiCabins';
export default function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: id => delteCabinAPI(id),
    onSuccess: () => {
      toast.success('Delete cabin successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: err => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}
