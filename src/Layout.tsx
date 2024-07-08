import MainPage from './pages/MainPage';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <MainPage />
      <Outlet />
    </>
  );
}

export default Layout;
