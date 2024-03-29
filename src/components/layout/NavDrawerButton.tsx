import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { styled } from '@mui/system';
import { Box, Drawer, IconButton, Typography, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LinkBlock } from './NavBar';

const WideLinkBlock = styled(LinkBlock)`
  width: 10rem;
`;

export default function NavDrawerButton() {
  const [open, setOpen] = useState(false);
  const path = useRouter().asPath;

  const handleCloseDrawer = () => setOpen(!open);

  return (
    <>
      <IconButton
        aria-label="open the menu"
        onClick={() => setOpen(true)}
        sx={{ width: 48, height: 48 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={handleCloseDrawer}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: 2,
          }}
          component="nav"
          onClick={handleCloseDrawer}
        >
          <Typography variant="h2">메뉴</Typography>
          <WideLinkBlock href="/" selected={path === '/'}>
            메인
          </WideLinkBlock>
          <WideLinkBlock href="/phones" selected={path.startsWith('/phones')}>
            기기 목록
          </WideLinkBlock>
          <WideLinkBlock
            href="/comparison"
            selected={path.startsWith('/comparison')}
          >
            기기 비교
          </WideLinkBlock>
          <Divider />
          <WideLinkBlock
            href="/favorite"
            selected={path.startsWith('/favorite')}
          >
            북마크
          </WideLinkBlock>
          <WideLinkBlock
            href="/auth/account"
            selected={path.startsWith('/auth')}
          >
            계정 관리
          </WideLinkBlock>
        </Box>
      </Drawer>
    </>
  );
}
