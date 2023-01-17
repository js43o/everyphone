import styled from '@emotion/styled';
import Link from 'next/link';
import NavBar from './NavBar';
import Title from 'components/common/Title';

const HeaderBlock = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  gap: 2rem;
  width: 100%;
  padding: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export default function Header() {
  return (
    <HeaderBlock>
      <Title>
        <Link href="/">Everyphone</Link>
      </Title>
      <NavBar />
    </HeaderBlock>
  );
}
