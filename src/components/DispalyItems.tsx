import { ArrayProducts } from '../types/fetchTypes';
import styles from '../styles/DispalyItems.module.css';

interface IProps {
  data: ArrayProducts | undefined;
}

function DispalyItems({ data }: IProps) {
  function isJsonString(arr: string[]) {
    try {
      const parseArr = JSON.parse(arr.join());
      return parseArr;
    } catch (e) {
      return arr;
    }
  }

  return (
    <ul className={styles.listItems}>
      {data?.map(item => (
        <li key={item.id}>
          <h3>{item.title}</h3>
          <img className={styles.imgItem} src={isJsonString(item.images)[0]} alt="product" />
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default DispalyItems;

// export default DispalyItems

// export class DispalyItems extends Component<IProps> {
//   constructor(props: IProps) {
//     super(props);
//   }

// isJsonString = (arr: string[]) => {
//   console.log(arr);
//   try {
//     const parseArr = JSON.parse(arr.join());
//     return parseArr;
//   } catch (e) {
//     return arr;
//   }
// };

//   render() {
//     console.log(this.props.data);
//     return (
//       <ul className={styles.listItems}>
//         {this.props.data?.map(item => (
//           <li key={item.id}>
//             <h3>{item.title}</h3>
//             <img className={styles.imgItem} src={this.isJsonString(item.images)[0]} alt="product" />
//             <div>ddd</div>
//             <p>{item.description}</p>
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }
