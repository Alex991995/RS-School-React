import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function useRestoreQueryParams(key: string): [string, Dispatch<SetStateAction<string>>] {
  const [item, setItem] = useState(localStorage.getItem(key) || '');

  useEffect(() => {
    localStorage.setItem(key, item || '');
  }, [item]);

  return [item, setItem];
}

export { useRestoreQueryParams };
