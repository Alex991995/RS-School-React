'use client';
import { Product } from '../types/fetchTypes';
import styles from '../styles/CardList.module.css';
import Card from './Card';
import Checkbox from './Checkbox';
import { useAppSelector } from '../hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { selectData, selectProducts } from '../features/slices/productSlice';

function CardList() {
  const storedProducts = useAppSelector(selectProducts);
  const dataFromApi = useAppSelector(selectData);

  const [dataWithChecked, setDataWithChecked] = useState<Product[] | undefined>(undefined);

  function isCheckedFromStore(arr: Product) {
    const res = storedProducts?.some(item => item.id === arr.id);
    return res;
  }

  useEffect(() => {
    if (Array.isArray(dataFromApi)) {
      const changedData = dataFromApi.map(item => ({ ...item, checked: false }));
      setDataWithChecked(changedData);
    }
  }, [dataFromApi]);

  return (
    <>
      {dataWithChecked?.length !== 0 ? (
        <ul role="listItems" className={styles.listItems}>
          {dataWithChecked?.map(item => (
            <li className={styles.item} key={item.id}>
              <Card key={item.id} id={item.id} title={item.title} />
              <Checkbox checked={isCheckedFromStore(item)} product={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No data</p>
      )}
    </>
  );
}

export default CardList;
