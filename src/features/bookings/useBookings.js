import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

// this function is use to fetch the all the cabin

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  // filter value
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'eq' };

  // get sorting value
  const sortByParams = searchParams.get('sortBy') || 'startDate-desc';
  const [value, direction] = sortByParams.split('-');
  const sortBy = { value, direction };
  // Pagination
  const page = +searchParams.get('page') || 1;
  //  query data
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getAllBookings({ filter, sortBy, page }),
  });
  // pre fetching the next page
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getAllBookings({ filter, sortBy, page: page + 1 }),
    });
  if (1 < page)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getAllBookings({ filter, sortBy, page: page - 1 }),
    });
  return { bookings, isLoading, error, count };
}
