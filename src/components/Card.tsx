import { Link } from 'react-router-dom';
import { Product } from '../types/fetchTypes';

interface ICard {
  item: Product;
}

function Card({ item }: ICard) {
  const { id, title } = item;
  return (
    <Link to={`/details/${id}`} key={id}>
      <h3>{title}</h3>
    </Link>
  );
}

export default Card;
