import styled from '@emotion/styled';
import Link from 'next/link';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

const LinkBlock = styled(Link)<{ selected: boolean }>`
  padding: 0.5rem 1rem;
  font-weight: 500;
  border-radius: 10rem;
  &:hover {
    background: #efefef;
  }
  ${({ selected }) =>
    selected &&
    css`
      color: white;
      background: black;
    `};
`;

export default function NavBar() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        textAlign: 'center',
      }}
      component="nav"
    >
      <LinkBlock href="/" selected={router.asPath === '/'}>
        메인
      </LinkBlock>
      <LinkBlock href="/phones" selected={router.asPath === '/phones'}>
        기기 목록
      </LinkBlock>
      <LinkBlock href="/compare" selected={router.asPath === '/compare'}>
        기기 비교
      </LinkBlock>
    </Box>
  );
}
