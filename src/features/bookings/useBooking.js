import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

// this function is use to fetch the all the cabin

export function useBooking() {
  // the id of the booking can get from the URL params
  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  return { booking, isLoading, error };
}
