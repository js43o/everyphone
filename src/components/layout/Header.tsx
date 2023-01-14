import styled from '@emotion/styled';
import NavBar from './NavBar';

const HeaderBlock = styled.header`
  display: flex;
  gap: 1rem;
`;

export default function Header() {
  return (
    <HeaderBlock>
      Header
      <NavBar />
    </HeaderBlock>
  );
}
