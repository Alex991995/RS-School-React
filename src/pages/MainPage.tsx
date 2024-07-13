import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRestoreQueryParams } from '../hooks/useRestoreQueryParams';
import { ArrayProducts } from '../types/fetchTypes';

import CardList from '../components/CardList ';
import Loader from '../components/Loader';

import styles from '../styles/MainPage.module.css';
import Pagination from '../components/Pagination';

function MainPage() {
  const [data, setData] = useState<ArrayProducts | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useRestoreQueryParams('title');
  const [page, setPage] = useRestoreQueryParams('page');

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('page'));

  useEffect(() => {
    fetchData(title || '').then(response => setData(response));

    const queryPage = new URLSearchParams({ page: page || '1' });
    setSearchParams(queryPage);
  }, [page]);

  function handleChange(title: string) {
    const value = title.trim();
    setTitle(value);
  }

  async function handelData() {
    const response = await fetchData(title || '');
    setData(response);
  }

  async function fetchData(title: string): Promise<ArrayProducts | undefined> {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/?title=${title}&offset=${page || '1'}&limit=10`,
      );
      const result = response.json();
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      console.error(err);
      throw new Error('Cannot fetch data');
    }
  }

  return (
    <section className={styles.manBox}>
      <div className={styles.searchBox}>
        <div className={styles.fetchDataBox}>
          <input
            className={styles.input}
            value={title || ''}
            onChange={e => handleChange(e.target.value)}
            placeholder="Search"
          />
          <button className={`button`} onClick={handelData}>
            Search
          </button>
        </div>
      </div>

      {loading ? <Loader /> : <CardList data={data || undefined} />}

      <Pagination page={page || '1'} setPage={setPage} />
    </section>
  );
}

export default MainPage;
