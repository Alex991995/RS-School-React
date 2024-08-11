import { Product } from '../../types/fetchTypes';
import { baseUrl } from '../../utils/constants';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { RefObject, useEffect, useRef } from 'react';
import styles from '../../styles/CardDetails.module.css';
import { isJsonString } from '../../utils/functionHelpers';
import { useRestoreQueryParams } from '../../hooks/useRestoreQueryParams';
import Image from 'next/image';

interface IParams extends ParsedUrlQuery {
  id: string;
}

function DetailCard(product: Product) {
  const router = useRouter();

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <section ref={wrapperRef} className={`details ${styles.details}`}>
      <div className={styles.infoItem}>
        <div role="title-detail">{product?.title}</div>

        {product?.images && (
          <Image
            width={300}
            height={300}
            className={styles.imgItem}
            src={isJsonString(product.images)[0]}
            alt="product"
          />
        )}
        <p>{product?.description}</p>
      </div>
      <button role="button-close" className={`button close-bnt`}>
        X
      </button>
    </section>
  );
}

export default DetailCard;

function useOutsideAlerter(ref: RefObject<HTMLElement>) {
  const [title] = useRestoreQueryParams('title');
  const [page] = useRestoreQueryParams('page');
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const mainPage = event.target instanceof Element && event.target.closest('.mainPage');
      const details = event.target instanceof Element && event.target.closest('.details');
      const closeBtn =
        event.target instanceof Element && event.target.classList.contains('close-bnt');
      const labelText =
        event.target instanceof Element && event.target.classList.contains('label-text');
      if (closeBtn || (!!mainPage && !details && !labelText)) {
        router.push(`/?title=${title}&page=${page}`);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, page, router, title]);
}

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params as IParams;
  const response = await fetch(`${baseUrl}/${id}`);
  const props = await response.json();
  return { props };
};

export async function getStaticPaths() {
  const response = await fetch(baseUrl);
  const data: Product[] = await response.json();

  const paths = data.map(item => {
    return {
      params: { id: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
