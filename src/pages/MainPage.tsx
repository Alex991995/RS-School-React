import { Component } from 'react';
import { ArrayProducts } from '../types/fetchTypes';

import DispalyItems from '../components/DispalyItems';
import Loader from '../components/Loader';

import styles from '../styles/MainPage.module.css';

interface IProps {}

interface IState {
  data: undefined | ArrayProducts;
  input: string;
  loading: boolean;
  hasError: boolean;
}
class MainPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      data: undefined,
      input: localStorage.getItem('title') || '',
      loading: false,
      hasError: false,
    };
  }

  async componentDidMount() {
    const response = await this.fetchData(this.state.input || '');
    this.setState({ data: response });
  }

  handelData = async () => {
    const response = await this.fetchData(this.state.input);
    this.setState({ data: response });
  };

  handleChange = (title: string) => {
    const value = title.trim();
    localStorage.setItem('title', value);
    this.setState({ input: value });
  };

  fetchData = async (title: string): Promise<ArrayProducts | undefined> => {
    this.setState({ loading: true });
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/?title=${title}&offset=0&limit=10`,
      );
      const result = response.json();
      this.setState({ loading: false });
      return result;
    } catch (err) {
      this.setState({ loading: false });
      console.error(err);
      throw new Error('Cannot fetch data');
    }
  };

  throwErrorFunction = () => {
    throw new Error('Cannot fetch data');
  };

  componentDidUpdate(): void {
    if (this.state.hasError) {
      this.throwErrorFunction();
    }
  }

  render() {
    return (
      <section className={styles.manBox}>
        <div className={styles.searchBox}>
          <div className={styles.fetchDataBox}>
            <input
              className={styles.input}
              value={this.state.input}
              onChange={e => this.handleChange(e.target.value)}
              placeholder="Search"
            />
            <button className={`button`} onClick={this.handelData}>
              Search
            </button>
          </div>

          <button className={`button`} onClick={() => this.setState({ hasError: true })}>
            Let's make boom
          </button>
        </div>

        {this.state.loading ? <Loader /> : <DispalyItems data={this.state.data || undefined} />}
      </section>
    );
  }
}

export default MainPage;
