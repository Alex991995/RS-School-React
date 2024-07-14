import ErrorBoundary from './components/ErrorBoundary';
import RouteProvider from './components/RouteProvider';
import SearchPage from './pages/SearchPage';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <div className="wrapper">
        <RouteProvider>
          <ErrorBoundary>
            <SearchPage />
            <Outlet />
          </ErrorBoundary>
        </RouteProvider>
      </div>
    </>
  );
}

export default Layout;
