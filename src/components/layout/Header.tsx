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
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
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
