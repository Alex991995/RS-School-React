import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import UncontrolledForm from '../pages/UncontrolledForm';
import СontrolledForm from '../pages/СontrolledForm';
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
      { path: '/controlled', element: <СontrolledForm /> },
      {
        path: '*',
        element: <Navigate to="/notfound" />,
      },
    ],
  },
]);

export default router;
