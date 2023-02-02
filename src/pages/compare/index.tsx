import Head from 'next/head';
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Box, Grid, Typography } from '@mui/material';
import RatioImage from 'components/common/RatioImage';
import SelectingPhoneCard from 'components/compare/SelectingPhoneCard';
import { Phone } from 'utils/types';
import getPhoneByUrl from 'utils/getPhoneByUrl';

export default function Index(props: { phones: string }) {
  const phones: [Phone, Phone] = JSON.parse(props.phones);

  const [devices, setDevices] = useState<[Phone | null, Phone | null]>(phones);

  return (
    <>
      <Head>
        <title>Everyphone | Comparison</title>
        <meta name="description" content="스마트폰 비교" />
      </Head>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          maxWidth: 1024,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingX: { xs: 2, lg: 0 },
          }}
        >
          <Typography variant="h1">기기 비교</Typography>
        </Box>
        <Grid
          container
          sx={{
            textAlign: 'center',
            padding: 2,
            borderRadius: 2,
            bgcolor: 'paper.light',
          }}
        >
          <Grid item xs={5}>
            <SelectingPhoneCard phone={devices[0]} />
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                padding: 1,
                borderRadius: '100%',
                bgcolor: 'paper.dark',
                fontFamily: 'Bakbak One',
                fontSize: '1.25rem',
              }}
            >
              VS
            </Box>
          </Grid>
          <Grid item xs={5}>
            <SelectingPhoneCard phone={devices[1]} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // dummy datas
  const phone1 = await getPhoneByUrl('samsung-galaxy-s22');
  const phone2 = await getPhoneByUrl('apple-iphone-14-pro-max');

  return {
    props: {
      phones: JSON.stringify([phone1, phone2]),
    },
  };
};
