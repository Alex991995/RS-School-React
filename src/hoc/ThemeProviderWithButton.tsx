'use client';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './theme';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectProducts } from '@/features/slices/productSlice';

import SelectedItems from '@/components/SelectedItems';
import Loader from '@/app/loading';
import ButtonTheme from '@/components/ButtonTheme';

interface ThemeProviderWithButtonProps {
  children: React.ReactNode;
}

function ThemeProviderWithButton({ children }: ThemeProviderWithButtonProps) {
  const theme = useContext(ThemeContext);
  const storedProducts = useAppSelector(selectProducts);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <div className="wrapper" data-theme={theme?.theme ? 'light' : 'dark'}>
      <div className="wrapper-theme">
        {theme && <ButtonTheme onSwitch={theme.toggleTheme} theme={theme.theme} />}

        {children}

        {storedProducts?.length !== 0 && <SelectedItems storedProducts={storedProducts} />}
      </div>
    </div>
  );
}

export default ThemeProviderWithButton;
