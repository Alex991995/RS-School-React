// import MainPage from './pages/MainPage';
// import ErrorBoundary from './components/ErrorBoundary';
// import styles from './App.module.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import CardDetails from './pages/CardDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/details/:id',
        element: <CardDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <main className={styles.container}> */}
      {/* <ErrorBoundary>
            <MainPage />
          </ErrorBoundary> */}
      {/* </main> */}
    </>
  );
}

export default App;
