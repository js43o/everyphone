import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { Phone } from 'utils/types';
import RatioImage from 'components/common/RatioImage';

export default function PhoneCard(props: { data: Phone; priority?: boolean }) {
  const { data, priority } = props;

  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardActionArea>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <RatioImage
            src={`/images/phones/${data.url}.png`}
            alt={data.url}
            height={120}
            priority={priority}
          />
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              textAlign: 'center',
            }}
          >
            <Typography variant="semibold">{data.name}</Typography>
            <Typography variant="secondary">{data.manufacturer}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
