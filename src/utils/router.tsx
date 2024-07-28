import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../Layout';
import CardDetails from '../pages/CardDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/details/:id',
        element: <CardDetails />,
      },
      {
        path: '*',
        element: <Navigate to="/notfound" />,
      },
    ],
  },
]);

export default router;
