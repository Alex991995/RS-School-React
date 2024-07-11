import { Link } from 'react-router-dom';
import { Product } from '../types/fetchTypes';
// import styles from '../styles/Card.module.css';
// import { isJsonString } from '../utils/functionHelpers';

interface ICard {
  item: Product;
}

function Card({ item }: ICard) {
  const { id, title } = item;
  return (
    <Link to={`/details/${id}`} key={id}>
      <h3>{title}</h3>

      {/* <img className={styles.imgItem} src={isJsonString(item.images)[0]} alt="product" />
      <p>{item.description}</p> */}
    </Link>
  );
}

export default Card;
