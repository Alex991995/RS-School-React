import { useContext } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundProvider from './hoc/NotFoundProvider';
import SearchPage from './pages/SearchPage';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from './hoc/theme';
import ButtonTheme from './components/ButtonTheme';
import SelectedItems from './components/SelectedItems';
import { useAppSelector } from './hooks/reduxHooks';
import { selectProducts } from './features/slices/productSlice';

function Layout() {
  const theme = useContext(ThemeContext);
  const storedProducts = useAppSelector(selectProducts);

  return (
    <>
      <div className="theme" data-theme={theme?.theme ? 'light' : 'dark'}>
        <div className="wrapper">
          <NotFoundProvider>
            <ErrorBoundary>
              <SearchPage />
              <Outlet />
              {theme && <ButtonTheme onSwitch={theme.toggleTheme} theme={theme.theme} />}
              {storedProducts?.length !== 0 && <SelectedItems storedProducts={storedProducts} />}
            </ErrorBoundary>
          </NotFoundProvider>
        </div>
      </div>
    </>
  );
}

export default Layout;
