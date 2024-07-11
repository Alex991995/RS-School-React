import { ArrayProducts } from '../types/fetchTypes';
import styles from '../styles/CardList.module.css';
import Card from './Card';

interface IProps {
  data: ArrayProducts | undefined;
}

function CardList({ data }: IProps) {
  return <ul className={styles.listItems}>{data?.map(item => <Card item={item} />)}</ul>;
}

export default CardList;
