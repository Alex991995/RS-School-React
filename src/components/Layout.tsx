import { useContext } from 'react';
import dynamic from 'next/dynamic';

import ButtonTheme from './ButtonTheme';
import SearchInput from './SearchInput';
import { ThemeContext } from '../hoc/theme';
const SelectedItems = dynamic(() => import('./SelectedItems'), { ssr: false });
const Pagination = dynamic(() => import('./Pagination'), { ssr: false });
const CardList = dynamic(() => import('./CardList'), { ssr: false });

import { selectData, selectProducts } from '../features/slices/productSlice';
import { useAppSelector } from '../hooks/reduxHooks';
import styles from '../styles/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const dataFromApi = useAppSelector(selectData);
  const theme = useContext(ThemeContext);
  const storedProducts = useAppSelector(selectProducts);

  return (
    <>
      <div className="theme" data-theme={theme?.theme ? 'light' : 'dark'}>
        {theme && <ButtonTheme onSwitch={theme.toggleTheme} theme={theme.theme} />}
        <div className="wrapper">
          <div className={styles.manBox}>
            <SearchInput />
            {typeof window !== 'undefined' && dataFromApi?.length !== 0 && (
              <CardList dataFromApi={dataFromApi} />
            )}
            <Pagination />
          </div>

          {children}
          {storedProducts?.length !== 0 && <SelectedItems storedProducts={storedProducts} />}
        </div>
      </div>
    </>
  );
}

export default Layout;
