import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import UncontrolledForm from '../pages/UncontrolledForm';
import MainPage from '../pages/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/uncontrolled',
        element: <UncontrolledForm />,
      },
      {
        path: '*',
        element: <Navigate to="/notfound" />,
      },
    ],
  },
]);

export default router;
