import Layout from '../components/Layout';

import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { ThemeProvider } from '../hoc/theme';
import { wrapper } from '../features/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
export default wrapper.withRedux(App);
