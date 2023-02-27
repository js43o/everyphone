import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { Box, Grid, Typography } from '@mui/material';
import SelectingPhone from 'components/comparison/SelectingPhone';
import SpecComparisonSheet from 'components/comparison/SpecComparisonSheet';
import SizeComparisonSection from 'components/comparison/SizeComparisonSection';
import VsCircle from 'components/comparison/VsCircle';
import { comparisonDevicesState } from 'utils/atoms';

export default function Comparison() {
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
          gap: 2,
        }}
      >
        <Box
          sx={{
            px: { xs: 2, lg: 0 },
          }}
        >
          <Typography variant="h1">기기 비교</Typography>
        </Box>
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            px: 2,
          }}
        >
          <Grid item xs={5}>
            <SelectingPhone phone={device1} slot={1} />
          </Grid>
          <VsCircle />
          <Grid item xs={5}>
            <SelectingPhone phone={device2} slot={2} />
          </Grid>
        </Grid>
        <SpecComparisonSheet device1={device1} device2={device2} />
        <SizeComparisonSection device1={device1} device2={device2} />
      </Box>
    </>
  );
}
