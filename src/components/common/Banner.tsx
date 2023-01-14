import Image from 'next/image';
import styled from '@emotion/styled';
import Title from 'components/common/Title';

const BannerBlock = styled.section`
  display: flex;
  width: 100%;
  max-width: 768px;
  height: 15rem;
  padding: 1rem;
  border-radius: 0.5rem;
  color: white;
  background: #191919;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  .banner_image {
    position: relative;
    left: 2rem;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: inherit;
    .banner_letter {
      .explanation {
        display: none;
      }
    }
    .banner_image {
      display: none;
    }
  }
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
      <Image
        src="/images/s22p_white_and_s22_pink.png"
        alt="s22p_white_and_s22_pink.png"
        width="400"
        height="400"
        className="banner_image"
      />
    </BannerBlock>
  );
}
