import { useState, useEffect, useRef, RefObject } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/fetchTypes';
import { useNavigate } from 'react-router-dom';

import { isJsonString } from '../utils/functionHelpers';
import styles from '../styles/CardDetails.module.css';
import Loader from '../components/Loader';

function CardDetails() {
  const { id } = useParams();
  const [data, setDate] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  console.log(data);

  useEffect(() => {
    fetchSingleProduct().then(response => setDate(response));
  }, [id]);

  async function fetchSingleProduct() {
    setLoading(true);
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    if (!response.ok) throw new Error('Cannot fetch data');
    const res = response.json();
    setLoading(false);
    return res;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section ref={wrapperRef} className={styles.details}>
          <div className={styles.infoItem}>
            <div>{data?.title}</div>

            {data?.images && (
              <img className={styles.imgItem} src={isJsonString(data.images)[0]} alt="product" />
            )}
            <p>{data?.description}</p>
          </div>
          <button className={`button close-bnt`}>X</button>
        </section>
      )}
    </>
  );
}

function useOutsideAlerter(ref: RefObject<HTMLElement>) {
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        (ref && ref.current && event && !ref.current.contains(event.target as Node)) ||
        (event.target instanceof Element && event.target.classList.contains('close-bnt'))
      ) {
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
