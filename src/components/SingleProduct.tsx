'use client';
import { Product } from '@/types/fetchTypes';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

import { RefObject, useEffect, useRef } from 'react';
import styles from '@/styles/CardDetails.module.css';
import { isJsonString } from '@/utils/functionHelpers';
import { useRestoreQueryParams } from '@/hooks/useRestoreQueryParams';

interface SingleProductProps {
  product: Product;
}

function SingleProduct({ product }: SingleProductProps) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <section ref={wrapperRef} className={`details ${styles.details}`}>
      <div className={styles.infoItem}>
        <div role="title-detail">{product?.title}</div>

        {product?.images && (
          <Image
            role="img-detail"
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

export default SingleProduct;

function useOutsideAlerter(ref: RefObject<HTMLElement>) {
  const [title] = useRestoreQueryParams('title');
  const [page] = useRestoreQueryParams('page');
  const { replace } = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const mainPage = event.target instanceof Element && event.target.closest('.mainPage');
      const details = event.target instanceof Element && event.target.closest('.details');
      const closeBtn =
        event.target instanceof Element && event.target.classList.contains('close-bnt');
      const labelText =
        event.target instanceof Element && event.target.classList.contains('label-text');
      if (closeBtn || (!!mainPage && !details && !labelText)) {
        replace(`/?title=${title}&page=${page}`);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, page, replace, title]);
}
