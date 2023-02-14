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
    background: ${({ theme }) => theme.palette.bluegrey.main};
  }
  ${({ theme, selected }) =>
    selected &&
    css`
      color: ${theme.palette.bluegrey.lighter};
      background: ${theme.palette.bluegrey.black};
      &:hover {
        color: ${theme.palette.bluegrey.lighter};
        background: ${theme.palette.bluegrey.black};
      }
    `};
`;

export default function NavBar() {
  const path = useRouter().asPath;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        textAlign: 'center',
      }}
      component="nav"
    >
      <LinkBlock href="/" selected={path === '/'}>
        메인
      </LinkBlock>
      <LinkBlock href="/phones" selected={path.startsWith('/phones')}>
        기기 목록
      </LinkBlock>
      <LinkBlock href="/comparison" selected={path.startsWith('/comparison')}>
        기기 비교
      </LinkBlock>
    </Box>
  );
}
