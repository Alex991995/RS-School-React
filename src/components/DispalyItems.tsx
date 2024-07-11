import { ArrayProducts } from '../types/fetchTypes';
import styles from '../styles/DispalyItems.module.css';
import { Link } from 'react-router-dom';

interface IProps {
  data: ArrayProducts | undefined;
}

function DispalyItems({ data }: IProps) {
  //   function isJsonString(arr: string[]) {
  //     try {
  //       const parseArr = JSON.parse(arr.join());
  //       return parseArr;
  //     } catch (e) {
  //       return arr;
  //     }
  //   }

  return (
    <ul className={styles.listItems}>
      {/* {console.log('cdc')} */}
      {data?.map(item => (
        <Link to={`/details/${item.id}`} key={item.id}>
          <h3>{item.title}</h3>
          {/* {console.log('cdc')} */}
          {/* <img className={styles.imgItem} src={isJsonString(item.images)[0]} alt="product" /> */}
          {/* <p>{item.description}</p> */}
        </Link>
      ))}
    </ul>
  );
}

export default DispalyItems;
