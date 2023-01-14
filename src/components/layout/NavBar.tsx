import styled from '@emotion/styled';
import Link from 'next/link';

const NavBarBlock = styled.nav`
  display: flex;
  gap: 1rem;
  text-align: center;
`;

export default function NavBar() {
  return (
    <NavBarBlock>
      <Link href="/">Home</Link>
      <Link href="/phones">Phones</Link>
      <Link href="/compare">Compare</Link>
    </NavBarBlock>
  );
}
