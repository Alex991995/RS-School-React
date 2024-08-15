import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import UncontrolledForm from '../components/UncontrolledForm';
// import CardDetails from '../pages/CardDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
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
