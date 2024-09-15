import { createBrowserRouter } from 'react-router-dom';
import RequireAuth from '../Components/RequireAuth/RequireAuth';
import App from '../App';
import AuthLayout from '../Layouts/AuthLayout/AuthLayout';
import LoginForm from '../Components/LoginForm/LoginForm';
import RegisterForm from '../Components/RegisterForm/RegisterForm';

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
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <LoginForm />
      },
      {
        path: '/auth/register',
        element: <RegisterForm />
      }
    ]
  }
]);
