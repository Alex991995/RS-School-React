import { Product } from '../types/fetchTypes';
import styles from '../styles/CardList.module.css';
import Card from './Card';
import Checkbox from './Checkbox';
import { useAppSelector } from '../hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { selectProducts } from '../features/slices/productSlice';

interface CardListProps {
  dataFromApi: Product[] | undefined;
}

function CardList({ dataFromApi }: CardListProps) {
  const storedProducts = useAppSelector(selectProducts);
  const [dataWithChecked, setDataWithChecked] = useState<Product[] | undefined>(undefined);

  function isCheckedFromStore(arr: Product) {
    const res = storedProducts?.some(item => item.id === arr.id);
    return res;
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const changedData = dataFromApi?.map(item => ({ ...item, checked: false }));
      setDataWithChecked(changedData);
    }
  }, [dataFromApi]);

  if (dataFromApi?.length === 0) return 'No data';
  return (
    <>
      {dataWithChecked && (
        <ul className={styles.listItems}>
          {dataWithChecked?.map(item => (
            <li className={styles.item} key={item.id}>
              <Card key={item.id} id={item.id} title={item.title} />
              <Checkbox checked={isCheckedFromStore(item)} product={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default CardList;
