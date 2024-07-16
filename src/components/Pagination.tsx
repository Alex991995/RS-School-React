import { Dispatch, SetStateAction } from 'react';
import styles from '../styles/Pagination.module.css';
import { pagesCutting, range } from '../utils/functionHelpers';
import { allPages } from '../utils/constats';

interface IPagination {
  setPage: Dispatch<SetStateAction<string>>;
  page: string;
}

function Pagination({ setPage, page }: IPagination) {
  const getPagesCut = pagesCutting(allPages, +page);
  const numberPages = range(getPagesCut.start, getPagesCut.end);

  function handlerPage(currentPage: number) {
    setPage(String(currentPage));
  }

  function previousPage() {
    if (+page > 1) {
      setPage(prevPage => String(+prevPage - 1));
    }
  }

  function nextPage() {
    if (+page < allPages) {
      setPage(prevPage => String(+prevPage + 1));
    }
  }

  function isActiveButton(currentPage: number) {
    if (currentPage === +page) {
      return `button ${styles['button-active']}`;
    }
    return 'button';
  }

  return (
    <div className={styles['block-buttons']}>
      <button className="button" onClick={previousPage}>
        «
      </button>
      {numberPages.map(item => (
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
