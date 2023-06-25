import { Box, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function SetRatingButton(props: {
  rating: number;
  setRating: (rating: number) => void;
}) {
  const { rating, setRating } = props;
  return (
    <Box>
      {[...Array(5)].map((_, idx) => (
        <IconButton
          key={idx}
          onClick={() => setRating(idx + 1 != rating ? idx + 1 : idx)}
          sx={{ m: -1 }}
        >
          <StarIcon
            sx={{
              color: idx < rating ? 'orange' : 'bluegrey.main',
              width: 32,
              height: 32,
            }}
          />
        </IconButton>
      ))}
    </Box>
  );
}
