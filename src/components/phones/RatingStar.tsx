import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function RatingStar(props: { rating: number }) {
  const { rating } = props;
  return (
    <Box>
      {[...Array(5)].map((_, idx) =>
        idx < rating ? (
          <StarIcon key={idx} sx={{ m: -0.25, color: 'orange' }} />
        ) : (
          <StarIcon key={idx} sx={{ m: -0.25, color: 'bluegrey.main' }} />
        )
      )}
    </Box>
  );
}
