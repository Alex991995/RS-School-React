import { ArrayProducts, Product } from '../types/fetchTypes';
import styles from '../styles/CardList.module.css';
import Card from './Card';
import Checkbox from './Checkbox';
import { useAppSelector } from '../hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { selectProducts } from '../features/slices/productSlice';

interface IProps {
  data: ArrayProducts | undefined;
}

function CardList({ data }: IProps) {
  const storedProducts = useAppSelector(selectProducts);

  const [dataWithChecked, setDataWithChecked] = useState<ArrayProducts | undefined>(undefined);

  function isCheckedFromStore(arr: Product) {
    const res = storedProducts?.some(item => {
      if (item.id === arr.id) {
        return true;
      }
      return false;
    });
    return res;
  }

  useEffect(() => {
    const changedData = data?.map(item => ({ ...item, checked: false }));
    setDataWithChecked(changedData);
  }, [storedProducts]);

  if (data?.length === 0) return 'No data';
  return (
    <ul className={styles.listItems}>
      {dataWithChecked?.map(item => (
        <li className={styles.item} key={item.id}>
          <Card key={item.id} id={item.id} title={item.title} />
          <Checkbox checked={isCheckedFromStore(item)} product={item} />
        </li>
      ))}
    </ul>
  );
}

export default CardList;
