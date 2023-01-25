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
import RatioImage from 'components/common/RatioImage';

export default function IdPage(props: { phone: string }) {
  const phone: Phone = JSON.parse(props.phone);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
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
            padding: 2,
            borderRadius: 2,
            background: 'white',
          }}
        >
          <h2>{phone.name}</h2>
          <Divider />
          <List component="ul">
            <ListItem component="li" sx={{ gap: 1, alignItems: 'center' }}>
              <Typography variant="body1">제조사</Typography>
              <Chip label={phone.manufacturer} />
            </ListItem>
            <ListItem component="li" sx={{ gap: 1, alignItems: 'center' }}>
              <Typography variant="body1">출시일자</Typography>
              <Chip label={phone.released} />
            </ListItem>
            <ListItem component="li" sx={{ gap: 1, alignItems: 'center' }}>
              <Typography variant="body1" sx={{ flexShrink: 0 }}>
                디스플레이
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'wrap',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Chip label={`${phone.display.size}인치`} />
                <Chip label={`${phone.display.resolution.pixel} px`} />
                <Chip label={`${phone.display.resolution.ppi} ppi`} />
                <Chip label={`${phone.display.resolution.ratio}`} />
                <Chip label={`${phone.display.refreshRate} Hz`} />
              </Box>
            </ListItem>
            <ListItem
              component="li"
              sx={{ gap: 1, alignItems: 'center', flexFlow: 'wrap' }}
            >
              <Typography variant="body1" sx={{ flexShrink: 0 }}>
                카메라
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'wrap',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Chip label={`${phone.camera.rear}`} />
                <Chip label={`메인 ${phone.camera.main} MP`} />
              </Box>
            </ListItem>
            <ListItem
              component="li"
              sx={{
                gap: 1,
                alignItems: 'center',
                flexFlow: 'wrap',
              }}
            >
              <Typography variant="body1" sx={{ flexShrink: 0 }}>
                하드웨어
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'wrap',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Chip
                  label={`${phone.hardware.processor}`}
                  sx={{
                    display: 'flex',
                    flexFlow: 'wrap',
                  }}
                />
                <Chip label={`${phone.hardware.ram.join('/')}GB RAM`} />
              </Box>
            </ListItem>
            <ListItem component="li" sx={{ gap: 1, alignItems: 'center' }}>
              <Typography variant="body1">저장 용량</Typography>
              <Chip label={`${phone.price.map((p) => p.variant).join('/')}`} />
            </ListItem>
            <ListItem component="li" sx={{ gap: 1, alignItems: 'center' }}>
              <Typography variant="body1">배터리</Typography>
              <Chip label={`${phone.hardware.battery} mAh`} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
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
