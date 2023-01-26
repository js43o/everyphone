import { GetStaticPaths, GetStaticProps } from 'next';
import {
  Box,
  Grid,
  Divider,
  Typography,
  List,
  ListItem,
  Chip,
} from '@mui/material';
import getPhoneByUrl from 'lib/getPhoneByUrl';
import { Phone } from 'lib/types';
import { getSpecsOfPhone } from 'lib/methods';
import RatioImage from 'components/common/RatioImage';
import PhoneSpecList from 'components/phones/PhoneSpecList';
import Link from 'next/link';

export default function IdPage(props: { phone: string }) {
  const phone: Phone = JSON.parse(props.phone);
  const specs = getSpecsOfPhone(phone);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        flexGrow: 1,
        maxWidth: 1024,
      }}
    >
      <h1>기기 목록</h1>
      <Grid
        container
        sx={{
          flexGrow: 1,
        }}
      >
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
            background: 'white',
          }}
        >
          <h2>{phone.name}</h2>
          <Divider />
          {specs.map((spec) => (
            <Grid container item key={spec.key} sx={{ alignItems: 'center' }}>
              <Grid item xs={4}>
                <Typography variant="semibold">{spec.key}</Typography>
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
      <PhoneSpecList phone={phone} />
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{ phone: string }> = async (
  context
) => {
  const phone = await getPhoneByUrl(context.params?.id as string);

  return {
    props: {
      phone: JSON.stringify(phone || ''),
    },
  };
};
