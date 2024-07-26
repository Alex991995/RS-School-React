import { useEffect, useRef, RefObject } from 'react';
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { isJsonString } from '../utils/functionHelpers';
import styles from '../styles/CardDetails.module.css';
import Loader from '../components/Loader';

import { productApi } from '../features/slices/apiSlice';

function CardDetails() {
  const { id } = useParams();

  const { data, isFetching } = productApi.useGetSingleProductQuery(id!);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <section ref={wrapperRef} className={`details ${styles.details}`}>
          <div className={styles.infoItem}>
            <div role="title-detail">{data?.title}</div>

            {data?.images && (
              <img className={styles.imgItem} src={isJsonString(data.images)[0]} alt="product" />
            )}
            <p>{data?.description}</p>
          </div>
          <button role="button-close" className={`button close-bnt`}>
            X
          </button>
        </section>
      )}
    </>
  );
}

function useOutsideAlerter(ref: RefObject<HTMLElement>) {
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const mainPage = event.target instanceof Element && event.target.closest('.mainPage');
      const details = event.target instanceof Element && event.target.closest('.details');
      const closeBtn =
        event.target instanceof Element && event.target.classList.contains('close-bnt');
      const labelText =
        event.target instanceof Element && event.target.classList.contains('label-text');
      if (closeBtn || (!!mainPage && !details && !labelText)) {
        navigate('/');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export default CardDetails;
