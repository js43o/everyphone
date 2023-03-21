import { Box, Typography, Button } from '@mui/material';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Account() {
  const { data: session } = useSession();

  return session ? (
    <Box>
      <Typography variant="h3">{session.user?.email}으로 로그인 중</Typography>
      <Button onClick={() => signOut()}>로그아웃</Button>
    </Box>
  ) : (
    <Box>
      <Typography variant="h3">로그인 필요</Typography>
      <Button onClick={() => signIn()}>로그인</Button>
    </Box>
  );
}
