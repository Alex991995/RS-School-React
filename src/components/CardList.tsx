import { ArrayProducts } from '../types/fetchTypes';
import styles from '../styles/CardList.module.css';
import Card from './Card';

interface IProps {
  data: ArrayProducts | undefined;
}

function CardList({ data }: IProps) {
  if (data?.length === 0) return 'No data';
  return (
    <ul className={styles.listItems}>
      {data?.map(item => <Card key={item.id} id={item.id} title={item.title} />)}
    </ul>
  );
}

export default CardList;
