import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function RequireAuth({ children }) {
  const jwt = useSelector((s) => s.user.jwt);

  if (!jwt) {
    return <Navigate to='/auth/login' replace={true} />;
  }
  return children;
}

export default RequireAuth;
