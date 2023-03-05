import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { Phone } from 'utils/types';
import RatioImage from 'components/common/RatioImage';
import Link from 'next/link';

export default function PhoneCard(props: {
  data: Phone;
  href: string;
  priority?: boolean;
  handleDelete?: () => void;
}) {
  const { data, href, priority, handleDelete } = props;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 2,
      }}
    >
      <CardActionArea>
        <Link href={href}>
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
        </Link>
      </CardActionArea>
      {handleDelete && (
        <Button
          onClick={handleDelete}
          sx={{
            width: '100%',
          }}
        >
          삭제
        </Button>
      )}
    </Card>
  );
}
