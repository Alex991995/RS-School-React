import { Link } from 'react-router-dom';

interface ICard {
  id: number;
  title: string;
}

function Card({ id, title }: ICard) {
  return (
    <Link to={`/details/${id}`}>
      <h3>{title}</h3>
    </Link>
  );
}

export default Card;
