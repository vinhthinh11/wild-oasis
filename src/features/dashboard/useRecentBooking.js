import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBooking() {
  const [searchParams] = useSearchParams();
  const numDay = +searchParams.get('last') || 7;
  const queryDay = subDays(new Date(), numDay).toISOString();
  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings', numDay],
    queryFn: () => getBookingsAfterDate(queryDay),
  });
  return { isLoading, bookings };
}
