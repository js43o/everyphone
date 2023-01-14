import type { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyles from 'styles/GlobalStyles';
import Layout from 'components/layout';
import 'styles/normalize.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
