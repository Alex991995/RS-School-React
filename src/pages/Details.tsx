import { useState, useEffect, useRef, RefObject } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/fetchTypes';
import { useNavigate } from 'react-router-dom';

function Details() {
  const { id } = useParams();
  const [data, setDate] = useState<Product | null>(null);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    fetchSingleProduct().then(response => setDate(response));
  }, [id]);

  async function fetchSingleProduct() {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    if (!response.ok) throw new Error('Cannot fetch data');
    const res = response.json();
    return res;
  }

  return (
    <section ref={wrapperRef} className="details">
      <div>{data?.title}</div>;<button className={`close-bnt`}>X</button>
    </section>
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

export default Details;
