import { ReactNode } from 'react';
import Image from 'next/image';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Title from 'components/common/Title';
import useCurrentMedia from 'hooks/useCurrentMedia';

const BannerItem = (props: {
  contents: string | ReactNode;
  imageName: string;
  isTablet: boolean;
  priority?: boolean;
}) => {
  const { contents, imageName, isTablet, priority } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center', lg: 'flex-start' },
        position: 'relative',
        height: '100%',
        padding: 2,
        textAlign: {
          xs: 'center',
          lg: 'left',
        },
        img: {
          zIndex: -1,
          objectFit: 'cover',
        },
      }}
    >
      {contents}
      <Image
        src={`/images/banner/${imageName}_${isTablet ? 'small' : 'large'}.webp`}
        alt={imageName}
        fill
        sizes="(max-width: 768px) 734px, 992px"
        priority={priority}
      />
    </Box>
  );
};

export default function Banner() {
  const { isTablet } = useCurrentMedia();

  return (
    <Carousel
      animation="slide"
      duration={750}
      interval={6000}
      height={isTablet ? 430 : 240}
    >
      <BannerItem
        contents={
          <Box
            sx={{
              maxWidth: { xs: '100%', lg: 430 },
              color: 'bluegrey.lighter',
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
        isTablet={isTablet}
        priority
      />
      <BannerItem
        contents={
          <Box
            sx={{
              maxWidth: { xs: '100%', lg: 430 },
              color: 'bluegrey.lighter',
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
        isTablet={isTablet}
      />
    </Carousel>
  );
}
