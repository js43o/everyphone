import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { Box, Grid, Typography } from '@mui/material';
import SelectingPhone from 'components/comparison/SelectingPhone';
import ComparisonSheet from 'components/comparison/ComparisonSheet';
import { comparisonDevicesState } from 'utils/atoms';
import SizeComparison from 'components/comparison/SizeComparison';

export default function Index() {
  const [device1, device2] = useRecoilValue(comparisonDevicesState);

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
            display: 'flex',
            alignItems: 'center',
            padding: 2,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Grid item xs={5}>
            <SelectingPhone phone={device1} slot={1} />
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
                alignItems: 'center',
                justifyContent: 'center',
                padding: 1,
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '100%',
                bgcolor: 'bluegrey.darker',
                color: 'bluegrey.lighter',
                fontFamily: 'Bakbak One',
                fontSize: '1.25rem',
              }}
            >
              VS
            </Box>
          </Grid>
          <Grid item xs={5}>
            <SelectingPhone phone={device2} slot={2} />
          </Grid>
        </Grid>
        <ComparisonSheet device1={device1} device2={device2} />
        <SizeComparison device1={device1} device2={device2} />
      </Box>
    </>
  );
}
