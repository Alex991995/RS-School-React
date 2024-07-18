import { useContext } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundProvider from './hoc/NotFoundProvider';
import SearchPage from './pages/SearchPage';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from './hoc/theme';
import Button from './components/Button';

function Layout() {
  const theme = useContext(ThemeContext);

  return (
    <>
      <div className="theme" data-theme={theme?.theme ? 'light' : 'dark'}>
        <div className="wrapper">
          <NotFoundProvider>
            <ErrorBoundary>
              <SearchPage />
              <Outlet />
              {theme && <Button onSwitch={theme.toggleTheme} theme={theme.theme} />}
            </ErrorBoundary>
          </NotFoundProvider>
        </div>
      </div>
    </>
  );
}

export default Layout;
