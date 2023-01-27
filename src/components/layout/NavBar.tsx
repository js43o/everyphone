import styled from '@emotion/styled';
import Link from 'next/link';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

export const LinkBlock = styled(Link)<{ selected: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 10rem;
  font-weight: 500;
  &:hover {
    background: #efefef;
  }
  ${({ selected }) =>
    selected &&
    css`
      color: white;
      background: black;
      &:hover {
        color: white;
        background: black;
        pointer-events: none;
      }
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
      <LinkBlock href="/phones" selected={router.asPath.startsWith('/phones')}>
        기기 목록
      </LinkBlock>
      <LinkBlock
        href="/compare"
        selected={router.asPath.startsWith('/compare')}
      >
        기기 비교
      </LinkBlock>
    </Box>
  );
}
