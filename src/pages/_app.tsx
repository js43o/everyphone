import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material';
import Layout from 'components/layout';
import 'styles/normalize.css';
import GlobalStyles from 'styles/GlobalStyles';
import theme from 'styles/theme';

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <RecoilRoot>
            {appProps.router.pathname === '/auth/login' ? (
              <Component {...pageProps} />
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </RecoilRoot>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
