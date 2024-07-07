import { useEffect, useState } from 'react';
import { ArrayProducts } from '../types/fetchTypes';

import DispalyItems from '../components/DispalyItems';
import Loader from '../components/Loader';

import styles from '../styles/MainPage.module.css';

function MainPage() {
  const [data, setData] = useState<ArrayProducts | undefined>(undefined);
  const [value, setValue] = useState(localStorage.getItem('title') || '');
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchData(value).then(response => setData(response));
  }, []);

  useEffect(() => {
    if (hasError) throwErrorFunction();
  }, [hasError]);

  function throwErrorFunction() {
    throw new Error('Check ErrorBoundary');
  }

  function handleChange(title: string) {
    const value = title.trim();
    localStorage.setItem('title', value);
    setValue(value);
  }

  async function handelData() {
    const response = await fetchData(value);
    setData(response);
  }

  async function fetchData(title: string): Promise<ArrayProducts | undefined> {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/?title=${title}&offset=0&limit=10`,
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
            value={value}
            onChange={e => handleChange(e.target.value)}
            placeholder="Search"
          />
          <button className={`button`} onClick={handelData}>
            Search
          </button>
        </div>

        <button className={`button`} onClick={() => setHasError(true)}>
          Let's make boom
        </button>
      </div>

      {loading ? <Loader /> : <DispalyItems data={data || undefined} />}
    </section>
  );
}

export default MainPage;
