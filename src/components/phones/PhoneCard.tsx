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
    <Card sx={{ borderRadius: 2 }} variant="outlined">
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
            height={160}
            priority={priority}
            sizes="160px"
          />
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle1">{data.name}</Typography>
            <Typography variant="body2">{data.manufacturer}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
