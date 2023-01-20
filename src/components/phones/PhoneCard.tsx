import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { Phone } from 'lib/types';
import RatioImage from 'components/common/RatioImage';

export default function PhoneCard(props: { data: Phone }) {
  const data = props.data;

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
          />
          <Divider />
          <Typography fontWeight="500" textAlign="center">
            {data.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
