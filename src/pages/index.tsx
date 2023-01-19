import Head from 'next/head';
import Banner from 'components/common/Banner';

export default function Index() {
  return (
    <>
      <Head>
        <title>Everyphone | Main</title>
        <meta name="description" content="스마트폰에 관한 모든 것" />
      </Head>
      <Banner />
    </>
  );
}
