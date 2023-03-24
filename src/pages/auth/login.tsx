import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { Paper, Box, Typography, Divider, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function Login() {
  const { status } = useSession();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'bluegrey.main',
        height: '100%',
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          width: 240,
          padding: 2,
          borderRadius: 2,
          bgcolor: 'bluegrey.lighter',
        }}
      >
        <Typography variant="h2">로그인</Typography>
        <Divider />
        {status === 'authenticated' ? (
          <>
            <Typography variant="body1">이미 로그인된 상태입니다.</Typography>
            <Button
              sx={{
                alignSelf: 'flex-end',
              }}
            >
              <Link href="/">돌아가기</Link>
            </Button>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              py: 2,
            }}
          >
            <Button
              variant="contained"
              color="black"
              sx={{
                gap: 1,
                textAlign: 'left',
              }}
              onClick={() =>
                signIn('github', {
                  callbackUrl: process.env.NEXT_PUBLIC_HOMEPAGE_URL as string,
                })
              }
            >
              <GitHubIcon />
              Github으로 로그인
            </Button>
            <Button
              disabled
              variant="contained"
              sx={{
                gap: 1,
              }}
            >
              <ConstructionIcon />
              네이버 아이디로 로그인
            </Button>
            <Button
              disabled
              variant="contained"
              sx={{
                gap: 1,
              }}
            >
              <ConstructionIcon />
              카카오계정으로 로그인
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
