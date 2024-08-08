import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function useRestoreQueryParams(key: string): [string, Dispatch<SetStateAction<string>>] {
  const [item, setItem] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedItem = localStorage.getItem(key);

      setItem(storedItem || '');
    }
  }, [key]);
  const updateItem: Dispatch<SetStateAction<string>> = (value: SetStateAction<string>) => {
    setItem(value);
    if (typeof window !== 'undefined') {
      const newValue =
        typeof value === 'function' ? (value as (prevState: string) => string)(item) : value;
      localStorage.setItem(key, newValue);
    }
  };

  // const updateItem = (value: string) => {

  //   setItem(value);
  //   if (typeof window !== 'undefined') {
  //     localStorage.setItem(key, value);
  //   }
  // };

  return [item, updateItem];
}

export { useRestoreQueryParams };
