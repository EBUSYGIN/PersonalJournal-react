import { createBrowserRouter } from 'react-router-dom';
import RequireAuth from '../Components/RequireAuth/RequireAuth';
import App from '../App';
import AuthPage from '../Components/AuthPage/AuthPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    )
  },
  {
    path: '/auth/login',
    element: <AuthPage />
  }
]);
