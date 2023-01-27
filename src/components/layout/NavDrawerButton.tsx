import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Box, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LinkBlock } from './NavBar';

const WideLinkBlock = styled(LinkBlock)`
  width: 10rem;
`;

export default function NavDrawerButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onCloseDrawer = () => setOpen(!open);

  return (
    <>
      <IconButton
        aria-label="menu"
        onClick={() => setOpen(true)}
        sx={{ width: 48, height: 48 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={onCloseDrawer}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: 2,
          }}
          component="nav"
          onClick={onCloseDrawer}
        >
          <h2>메뉴</h2>
          <WideLinkBlock href="/" selected={router.asPath === '/'}>
            메인
          </WideLinkBlock>
          <WideLinkBlock
            href="/phones"
            selected={router.asPath.startsWith('/phones')}
          >
            기기 목록
          </WideLinkBlock>
          <WideLinkBlock
            href="/compare"
            selected={router.asPath.startsWith('/compare')}
          >
            기기 비교
          </WideLinkBlock>
        </Box>
      </Drawer>
    </>
  );
}
