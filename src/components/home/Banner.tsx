import { Box, Typography } from '@mui/material';
import Title from 'components/common/Title';
import { ReactNode } from 'react';
import Carousel from 'react-material-ui-carousel';

const BannerItem = (props: {
  contents: string | ReactNode;
  imgSrc: string;
}) => {
  const { contents, imgSrc } = props;

  return (
    <Box
      sx={{
        height: '100%',
        padding: 2,
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {contents}
    </Box>
  );
};

export default function Banner() {
  return (
    <Carousel animation="slide" duration={750} interval={6000} height={240}>
      <BannerItem
        contents={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: 430,
              color: 'white',
            }}
          >
            <Typography variant="h2">
              <Typography>당신이 찾는 모든 스마트폰,</Typography>
              <Title fontSize={2.5} />
            </Typography>
            Everyphone에서는 각종 스마트폰 기기에 대한 정보 및 스펙을 쉽게 찾고
            비교할 수 있습니다.
          </Box>
        }
        imgSrc="/images/banner/s23_triple.webp"
      />
      <BannerItem
        contents={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: 430,
              color: 'white',
            }}
          >
            <Typography variant="h2">
              <Typography>당신이 찾는 모든 스마트폰,</Typography>
              <Title fontSize={2.5} />
            </Typography>
            Everyphone에서는 각종 스마트폰 기기에 대한 정보 및 스펙을 쉽게 찾고
            비교할 수 있습니다.
          </Box>
        }
        imgSrc="/images/banner/iphone_14.webp"
      />
    </Carousel>
  );
}
