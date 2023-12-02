import toast from 'react-hot-toast';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';

const FullPage = styled.div`
  display: flex;
  height: 100vh;
  background-color: var(--color-grey-50);
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 4 states to check if the user is allowed to access the route
  // 1> Check if the user authenticated
  const { isLoading, isAuthenticated } = useUser();
  // 3> if the user is not authenticated toast the user have to login (move user to login page)
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        toast.error(t => (
          <span>
            You are not authenticated! Redirect to <strong>Login</strong> page
            within <strong>3 seconds</strong>
          </span>
        ));
        setTimeout(function () {
          navigate('login');
        }, 3000);
      }
    },
    [isAuthenticated, isLoading, navigate]
  );
  // 2> while checking the user load spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4> if the user is authenticated to the route page for user or AppLayout
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
