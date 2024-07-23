import React from 'react';
import { resetAllProduct } from '../features/slices/productSlice';
import { useAppDispatch } from '../hooks/reduxHooks';
import styles from '../styles/SelectedItems.module.css';
import { ArrayProducts } from '../types/fetchTypes';

interface SelectedItemsProps {
  storedProducts: ArrayProducts | undefined;
}

function SelectedItems({ storedProducts }: SelectedItemsProps) {
  const numberOfSelectedItems = storedProducts?.length;
  const dispatch = useAppDispatch();

  const headers = 'Id,Title,Description,Price';
  let rows = '';
  storedProducts?.forEach(item => {
    rows += `${item.id},${item.title},${item.description},${item.price}\n`;
  });
  const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;

  const encodedURI = encodeURI(csvContent);
  const name = `${numberOfSelectedItems}_products.csv`;

  function isHowManyItems(numberOfSelectedItems: number | undefined) {
    if (numberOfSelectedItems === 1) return '1 item is selected';
    return `${numberOfSelectedItems} items are selected`;
  }

  return (
    <div className={styles.selectedItems}>
      <div className={styles.content}>
        <h3 className={styles['content__title']}>{isHowManyItems(numberOfSelectedItems)}</h3>
        <div className={styles['content__buttons']}>
          <button onClick={() => dispatch(resetAllProduct())} className="button">
            Unselect all
          </button>
          <a href={encodedURI} className={`button ${styles['button__link']}`} download={name}>
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default SelectedItems;
