import { useRestoreQueryParams } from '../hooks/useRestoreQueryParams';
import Link from 'next/link';

interface ICard {
  id: number;
  title: string;
}

function Card({ id, title }: ICard) {
  const [titleQuery] = useRestoreQueryParams('title');
  const page = localStorage.getItem('page') || 1;

  return (
    <Link href={`/details/${id}?title=${titleQuery}&page=${page}`}>
      <h3>{title}</h3>
    </Link>
  );
}

export default Card;
