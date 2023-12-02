import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser as updateUserAPI } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ fullName, avatar, password }) =>
      updateUserAPI({ fullName, avatar, password }),
    onSuccess: () => {
      toast.success('Update user successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: error => toast.error(error.message),
  });
  return { updateUser, isUpdating };
}
