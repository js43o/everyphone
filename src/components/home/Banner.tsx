import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Title from 'components/common/Title';
import { ReactNode } from 'react';
import Carousel from 'react-material-ui-carousel';

const BannerItem = (props: {
  contents: string | ReactNode;
  imageName: string;
}) => {
  const { contents, imageName } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center', lg: 'flex-start' },
        height: '100%',
        padding: 2,
        backgroundImage: {
          xs: `url(/images/banner/${imageName}_small.webp)`,
          lg: `url(/images/banner/${imageName}_large.webp)`,
        },
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
        textAlign: {
          xs: 'center',
          lg: 'left',
        },
      }}
    >
      {contents}
    </Box>
  );
};

export default function Banner() {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('lg'));

  return (
    <Carousel
      animation="slide"
      duration={750}
      interval={6000}
      height={isMobile ? 430 : 240}
    >
      <BannerItem
        contents={
          <Box
            sx={{
              maxWidth: { xs: '100%', lg: 430 },
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
        imageName="s23_triple"
      />
      <BannerItem
        contents={
          <Box
            sx={{
              maxWidth: { xs: '100%', lg: 430 },
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
        imageName="iphone_14"
      />
    </Carousel>
  );
}
