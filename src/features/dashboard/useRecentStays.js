import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
  //ngu hoc dung async vo toi va dan den data khong deen ngay
  const [searchParams] = useSearchParams();
  const numDay = +searchParams.get('last') || 7;
  const queryDay = subDays(new Date(), numDay).toISOString();
  const { isLoading, data: stays } = useQuery({
    queryKey: ['stays', numDay],
    queryFn: () => getStaysAfterDate(queryDay),
  });
  const confirmStays = stays?.filter(
    stay => stay.status === 'checked-in' || stay.status === 'checked-out'
  );
  return { isLoading, stays, confirmStays };
}
