import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingout } = useMutation({
    mutationFn: bookingId =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: data => {
      toast.success(`Checkin cabin ${data.name} successfully!`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error('there was an error while cheking in'),
  });
  return { checkout, isCheckingout };
}
