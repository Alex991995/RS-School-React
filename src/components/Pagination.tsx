import { useEffect } from 'react';
import styles from '../styles/Pagination.module.css';
import { pagesCutting, range } from '../utils/functionHelpers';
import { allPages } from '../utils/constants';
import { useRestoreQueryParams } from '../hooks/useRestoreQueryParams';
import { useRouter } from 'next/router';

function Pagination() {
  const page = Number(localStorage.getItem('page')) || 1;
  const router = useRouter();
  const [, setPage] = useRestoreQueryParams('page');
  const getPagesCut = pagesCutting(allPages, Number(localStorage.getItem('page')) || 1);
  const numberPages = range(getPagesCut.start, getPagesCut.end);
  const title = localStorage.getItem('title') || '';

  useEffect(() => {
    router.push(`/?title=${title}&page=${page}`);
  }, [page, title]);

  function handlerPage(currentPage: number) {
    setPage(String(currentPage));
    router.push(`/?title=${title}&page=${String(currentPage)}`);
  }

  function previousPage() {
    if (+page > 1) {
      const res = +page - 1;
      setPage(String(res));
      router.push(`/?title=${title}&page=${res}`);
    }
  }

  function nextPage() {
    if (+page < allPages) {
      const res = +page + 1;
      setPage(String(res));
      router.push(`/?title=${title}&page=${res}`);
    }
  }

  function isActiveButton(currentPage: number) {
    if (currentPage === +page) {
      return `button button-active`;
    }

    if (page === 1 && currentPage === 1) {
      return `button button-active`;
    }

    return 'button';
  }

  return (
    <div className={styles['block-buttons']}>
      <button className="button" onClick={previousPage}>
        «
      </button>
      {numberPages?.map(item => (
        <button key={item} onClick={() => handlerPage(item)} className={isActiveButton(item)}>
          {item}
        </button>
      ))}
      <button className="button" onClick={nextPage}>
        »
      </button>
    </div>
  );
}

export default Pagination;
