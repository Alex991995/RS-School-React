import MainPage from './pages/MainPage';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <div className="wrapper">
        <MainPage />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
