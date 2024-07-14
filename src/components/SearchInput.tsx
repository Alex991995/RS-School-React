import styles from '../styles/SearchPage.module.css';

interface ISearchInput {
  title: string;
  handleChange: (title: string) => void;
  handelData: () => Promise<void>;
}

function SearchInput({ title, handleChange, handelData }: ISearchInput) {
  return (
    <div className={styles.fetchDataBox}>
      <input
        className={styles.input}
        value={title}
        onChange={e => handleChange(e.target.value)}
        placeholder="Search"
      />
      <button className={`button`} onClick={handelData}>
        Search
      </button>
    </div>
  );
}

export default SearchInput;
