import styled from '@emotion/styled';
import Link from 'next/link';
import NavBar from './NavBar';

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

const TitleBlock = styled(Link)`
  font-family: 'Bakbak One', cursive;
  font-size: 2rem;
`;

export default function Header() {
  return (
    <HeaderBlock>
      <TitleBlock href="/">Everyphone</TitleBlock>
      <NavBar />
    </HeaderBlock>
  );
}
