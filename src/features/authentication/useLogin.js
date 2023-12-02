import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginAPI } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI(email, password),
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard');
      toast.success('Login success');
    },
    onError: () => toast.error('Login error'),
  });
  return { login, isLoading };
}
