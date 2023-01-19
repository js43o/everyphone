import Image from 'next/image';
import { keyframes } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import Title from 'components/common/Title';

const fadeIn = keyframes`
from {
  transform: translateX(1rem);
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export default function Banner() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0.5,
        justifyContent: 'space-between',
        height: 220,
        padding: 2,
        borderRadius: 2,
        color: 'white',
        background: 'black',
        overflow: 'hidden',
      }}
    >
      <Box>
        <Box
          sx={{
            mb: 2,
          }}
        >
          당신이 찾는 모든 스마트폰,
          <Title fontSize={2.5}>Everyphone</Title>
        </Box>
        <Typography variant="body2">
          <b>Everyphone</b>에서는 여러 스마트폰에 대한 스펙과 비교 정보를 쉽게
          얻을 수 있습니다.
        </Typography>
      </Box>
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          animation: `${fadeIn} 1s ease`,
        }}
      >
        <Image
          src="/images/s22p_white_halfside.png"
          alt="s22p_white_and_s22_pink.png"
          width="200"
          height="400"
          className="banner_image"
        />
      </Box>
    </Box>
  );
}
