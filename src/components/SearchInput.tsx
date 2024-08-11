'use client';
import styles from '../styles/Layout.module.css';
import { useRestoreQueryParams } from '../hooks/useRestoreQueryParams';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

function SearchInput() {
  const { replace } = useRouter();
  const [title, setTitle] = useRestoreQueryParams('title');
  const [, updateItem] = useRestoreQueryParams('page');

  const searchParams = useSearchParams();
  const pathname = usePathname();

  function handleChange(title: string) {
    const value = title.trim();
    setTitle(value);
  }

  function callData() {
    const params = new URLSearchParams(searchParams);
    params.set('title', title);
    params.set('page', '1');
    updateItem('1');

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={styles.fetchDataBox}>
      <input
        data-testid="input"
        className={styles.input}
        defaultValue={searchParams.get('title')?.toString()}
        onChange={e => handleChange(e.target.value)}
        placeholder="Search"
      />
      <button className={`button`} onClick={callData}>
        Search
      </button>
    </div>
  );
}

export default SearchInput;
