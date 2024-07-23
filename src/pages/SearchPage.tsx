import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRestoreQueryParams } from '../hooks/useRestoreQueryParams';

import CardList from '../components/CardList';
import Loader from '../components/Loader';

import styles from '../styles/SearchPage.module.css';
import Pagination from '../components/Pagination';
import SearchInput from '../components/SearchInput';
import { useLazyGetProductQuery } from '../features/slices/apiSlice';

function SearchPage() {
  const [title, setTitle] = useRestoreQueryParams('title');
  const [page, setPage] = useRestoreQueryParams('page');
  const [trigger, { data, isFetching }] = useLazyGetProductQuery();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryPage = new URLSearchParams({ page: page || '1' });
    setSearchParams(queryPage);

    trigger({ title: title, page: page });
  }, [page]);

  function handleChange(title: string) {
    const value = title.trim();
    setTitle(value);
  }

  function callData() {
    trigger({ title: title, page: page });
  }

  return (
    <section className={`mainPage ${styles.manBox}`}>
      <div className={styles.searchBox}>
        <SearchInput title={title} handleChange={handleChange} handelData={callData} />
      </div>

      {isFetching ? <Loader /> : <CardList data={data || undefined} />}

      <Pagination page={page || '1'} setPage={setPage} />
    </section>
  );
}

export default SearchPage;
