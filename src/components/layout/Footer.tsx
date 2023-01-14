import styled from '@emotion/styled';

const FooterBlock = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  gap: 2rem;
  width: 100%;
  padding: 1rem;
  box-shadow: 0 -0.25rem 1rem rgba(0, 0, 0, 0.1);
`;

export default function Footer() {
  return <FooterBlock>Footer</FooterBlock>;
}
