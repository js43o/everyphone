import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import Banner from 'components/home/Banner';
import PhoneCard from 'components/common/PhoneCard';
import getPhones from 'utils/db/getPhones';
import { ITEM_PER_PAGE } from 'utils/constants';
import { Phone } from 'utils/types';
import NoResult from 'components/common/NoResult';

export default function Index(props: { phones: string }) {
  return (
    <>
      <Head>
        <title>Everyphone | Main</title>
        <meta name="description" content="스마트폰에 관한 모든 것" />
      </Head>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          px: { xs: 2, lg: 0 },
        }}
      >
        <Banner />
        <Typography variant="h1">최신 기기</Typography>
        <Grid container spacing={1}>
          {props.phones ? (
            (JSON.parse(props.phones) as Phone[]).map((phone, index) => (
              <Grid item key={phone.url} xs={12} md={6} lg={3}>
                <Link href={`/phones/${encodeURIComponent(phone.url)}`}>
                  <PhoneCard data={phone} priority={index < ITEM_PER_PAGE} />
                </Link>
              </Grid>
            ))
          ) : (
            <NoResult />
          )}
        </Grid>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { phones } = await getPhones({ options: 4 });

  return {
    props: {
      phones: JSON.stringify(phones),
    },
  };
};
