import { GetStaticPaths, GetStaticProps } from 'next';
import { Box, Grid, Divider, Typography, Chip } from '@mui/material';
import getPhoneByUrl from 'utils/db/getPhoneByUrl';
import { Phone } from 'utils/types';
import { getSpecsOfPhone } from 'utils/methods';
import RatioImage from 'components/common/RatioImage';
import SpecSheet from 'components/phones/SpecSheet';
import getAllPhoneUrls from 'utils/db/getAllPhoneUrls';

export default function IdPage(props: { phone: string }) {
  const phone: Phone = JSON.parse(props.phone);
  const specs = getSpecsOfPhone(phone);

  return (
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
        <Typography variant="h1">기기 목록</Typography>
      </Box>
      <Grid container>
        <Grid
          item
          xs={12}
          lg={7}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <RatioImage
            src={`/images/phones/${phone.url}.png`}
            alt={phone.url}
            height={320}
            priority
            quality={100}
          />
        </Grid>
        <Grid
          item
          xs={12}
          lg={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: 2,
            borderRadius: 2,
            bgcolor: 'bluegrey.lighter',
          }}
        >
          <Typography variant="h2">{phone.name}</Typography>
          <Divider />
          {specs.map((spec) => (
            <Grid container item key={spec.key} sx={{ alignItems: 'center' }}>
              <Grid item xs={4}>
                <Typography variant="subtitle1">{spec.key}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'wrap',
                    gap: 0.5,
                  }}
                >
                  {spec.value.map(
                    (s) => s && <Chip key={s} label={s} variant="outlined" />
                  )}
                </Box>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <SpecSheet phone={phone} />
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const urls = await getAllPhoneUrls();

  return {
    paths: urls.map((url) => ({
      params: {
        id: url,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const phone = await getPhoneByUrl(context.params?.id as string);

  return {
    props: {
      phone: JSON.stringify(phone || ''),
    },
  };
};
