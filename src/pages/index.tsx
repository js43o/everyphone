import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import Banner from 'components/home/Banner';

export default function Index() {
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
      </Box>
    </>
  );
}
