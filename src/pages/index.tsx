import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Box, Grid, Typography } from '@mui/material';
import Banner from 'components/home/Banner';
import PhoneCard from 'components/common/PhoneCard';
import NoResult from 'components/common/NoResult';
import { Phone } from 'utils/types';
import { ITEM_PER_PAGE } from 'utils/constants';
import getAllPhones from 'utils/db/getAllPhones';

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
                <PhoneCard
                  data={phone}
                  href={`/phones/${encodeURIComponent(phone.url)}`}
                  priority={index < ITEM_PER_PAGE}
                />
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
  const { phones } = await getAllPhones(4);

  return {
    props: {
      phones: JSON.stringify(phones),
    },
  };
};
