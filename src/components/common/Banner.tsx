import Image from 'next/image';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Title from 'components/common/Title';
import SectionBlock from './SectionBlock';

const BannerBlock = styled(SectionBlock)`
  gap: 0.5rem;
  justify-content: space-between;
  height: 15rem;
  color: white;
  background: linear-gradient(
    0deg,
    rgba(9, 9, 13, 1) 0%,
    rgba(58, 58, 62, 1) 100%
  );
  overflow: hidden;
  @media (max-width: 480px) {
    height: inherit;
    .banner_image {
      display: none;
    }
  }
`;

const fadeIn = keyframes`
from {
  transform: translateX(1rem);
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const FadeInWrapper = styled.div`
  animation: ${fadeIn} 1s ease;
`;

export default function Banner() {
  return (
    <BannerBlock>
      <div className="banner_letter">
        <h2>
          당신이 찾는 모든 스마트폰,
          <br />
          <Title fontSize={2.5}>Everyphone</Title>
        </h2>
        <div className="explanation">
          <b>Everyphone</b>에서는 여러 스마트폰에 대한 스펙과 비교 정보를 쉽게
          얻을 수 있습니다.
        </div>
      </div>
      <FadeInWrapper>
        <Image
          src="/images/s22p_white_halfside.png"
          alt="s22p_white_and_s22_pink.png"
          width="200"
          height="400"
          className="banner_image"
        />
      </FadeInWrapper>
    </BannerBlock>
  );
}
