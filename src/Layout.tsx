import ErrorBoundary from './components/ErrorBoundary';
import NotFoundProvider from './components/NotFoundProvider';
import SearchPage from './pages/SearchPage';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <div className="wrapper">
        <NotFoundProvider>
          <ErrorBoundary>
            <SearchPage />
            <Outlet />
          </ErrorBoundary>
        </NotFoundProvider>
      </div>
    </>
  );
}

export default Layout;
