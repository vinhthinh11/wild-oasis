import { useMutation } from '@tanstack/react-query';
import { signup as signupAPI } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: sigup, isIdle } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupAPI({ fullName, email, password }),
    onSuccess: user => {
      toast.success('signup successful');
    },
    onError: error => {
      toast.error(error.message);
    },
  });
  console.log(isIdle);
  return { sigup, isIdle };
}
