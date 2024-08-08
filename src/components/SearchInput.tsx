import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';
import { useRestoreQueryParams } from '../hooks/useRestoreQueryParams';

function SearchInput() {
  const router = useRouter();
  const [title, setTitle] = useRestoreQueryParams('title');
  const [, updateItem] = useRestoreQueryParams('page');

  function handleChange(title: string) {
    const value = title.trim();
    setTitle(value);
  }

  function callData() {
    router.push(`/?title=${title}&page=1`);
    updateItem('1');
  }

  return (
    <div className={styles.fetchDataBox}>
      <input
        data-testid="input"
        className={styles.input}
        value={title}
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
