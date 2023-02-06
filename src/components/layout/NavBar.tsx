import Link from 'next/link';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const LinkBlock = styled(Link)<{ selected: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 10rem;
  font-weight: 500;
  &:hover {
    background: ${({ theme }) => theme.palette.paper.main};
  }
  ${({ selected }) =>
    selected &&
    css`
      color: white;
      background: black;
      &:hover {
        color: white;
        background: black;
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
        href="/comparison"
        selected={router.asPath.startsWith('/comparison')}
      >
        기기 비교
      </LinkBlock>
    </Box>
  );
}
