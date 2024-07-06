import { Component } from 'react';
import MainPage from './pages/MainPage';
import ErrorBoundary from './components/ErrorBoundary';
import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <>
        <main className={styles.container}>
          <ErrorBoundary>
            <MainPage />
          </ErrorBoundary>
        </main>
      </>
    );
  }
}

export default App;
