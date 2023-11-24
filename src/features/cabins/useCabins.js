import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

// this function is use to fetch the all the cabin

export function useCabin() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({ queryKey: ['cabins'], queryFn: getCabins });
  return { cabins, isLoading, error };
}
