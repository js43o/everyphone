import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import {
  Box,
  Grid,
  Divider,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RatioImage from 'components/common/RatioImage';
import SpecSheet from 'components/phones/SpecSheet';
import CommentsSection from 'components/phones/CommentsSection';
import { Phone, PhoneRating } from 'utils/types';
import { getSpecsOfPhone, isFavorite, toggleFavorite } from 'utils/methods';
import { getPhoneByUrl, getRatingOfPhone } from 'utils/db/functions/phone';
import RatingStar from 'components/phones/RatingStar';

export default function PhonesId(props: { phone: string; rating: string }) {
  const phone: Phone = JSON.parse(props.phone);
  const rating: PhoneRating = JSON.parse(props.rating);
  const [favorite, setFavorite] = useState(false);
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL as string;

  useEffect(() => {
    if (isFavorite(phone.name)) setFavorite(true);
  }, [phone.name]);

  const handleToggleFavorite = async () => {
    setFavorite(!favorite);
    toggleFavorite(phone.name);
  };

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
            src={`${IMAGE_URL}/phones/${phone.url}.png`}
            alt={phone.url}
            height={320}
            priority
            quality={100}
            sizes="320px"
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h2">{phone.name}</Typography>
              <IconButton
                onClick={handleToggleFavorite}
                aria-label="toggle the favorite device"
                sx={{ width: 48, height: 48 }}
              >
                {favorite ? (
                  <FavoriteIcon color="secondary" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, color: 'grey' }}>
              <RatingStar rating={rating.average} />({rating.count}명)
            </Box>
          </Box>
          <Divider />
          {getSpecsOfPhone(phone).map((spec) => (
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
      <CommentsSection phoneUrl={phone.url} phoneName={phone.name} />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = context.params?.id as string;
  const phone = await getPhoneByUrl(url);
  const rating = await getRatingOfPhone(url);

  return {
    props: {
      phone: JSON.stringify(phone || ''),
      rating: JSON.stringify(rating || ''),
    },
  };
};
