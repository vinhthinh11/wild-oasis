import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkout, isLoading: isCheckingout } = useMutation({
    mutationFn: bookingId =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: data => {
      toast.success(`Checkin cabin ${data.name} successfully!`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: () => toast.error('there was an error while cheking in'),
  });
  return { checkout, isCheckingout };
}
