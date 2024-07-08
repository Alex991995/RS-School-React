// import MainPage from './pages/MainPage';
// import ErrorBoundary from './components/ErrorBoundary';
// import styles from './App.module.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Details from './pages/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/details/:id',
        element: <Details />,
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
