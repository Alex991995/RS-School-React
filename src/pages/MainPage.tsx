import { useSelector } from 'react-redux';
import { selectAllData } from '../features/slices/usersSlice';
import styles from '../styles/MainPage.module.css';

function MainPage() {
  const selectData = useSelector(selectAllData);
  if (selectData.length === 0) return <h2>no data</h2>;

  function checkTheLastData(i: number) {
    if (selectData.length - 1 === i) {
      return `${styles.user} ${styles.lastUser} `;
    }
    return styles.user;
  }
  return (
    <section className={styles.mainBox}>
      <ul className={styles.listUsers}>
        {selectData.map((data, i) => (
          <li className={checkTheLastData(i)} key={i}>
            <div className={styles.boxImg}>
              {data.img && typeof data.img === 'string' && (
                <img className={styles.userImg} src={data.img} alt="img" />
              )}
            </div>
            <p>
              Name: <span className={styles.userData}>{data.username}</span>
            </p>
            <p>
              Age: <span className={styles.userData}> {data.age}</span>
            </p>
            <p>
              Country: <span className={styles.userData}>{data.country}</span>
            </p>
            <p>
              Email: <span className={styles.userData}>{data.email}</span>
            </p>
            <p>
              Gender: <span className={styles.userData}>{data.gender}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MainPage;
