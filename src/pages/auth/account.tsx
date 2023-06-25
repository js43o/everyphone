import { Box, Typography, Button, Avatar, List, ListItem } from '@mui/material';
import MyUserComments from 'components/auth/MyComments';
import { useSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';

export default function Account() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <Box>
      <Head>
        <title>Everyphone | Account</title>
        <meta name="description" content="계정 정보" />
      </Head>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
          px: { xs: 2, lg: 0 },
        }}
      >
        <Typography variant="h1">계정 정보</Typography>
        {user ? (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
              }}
            >
              <Avatar
                src={user.image || undefined}
                alt={user.name || undefined}
                sx={{ width: 150, height: 150 }}
              ></Avatar>
              <List>
                <ListItem
                  sx={{
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">계정명 |</Typography>
                  <Typography variant="body1">{user.name}</Typography>
                </ListItem>
                <ListItem
                  sx={{
                    gap: 1,
                  }}
                >
                  <Typography variant="subtitle1">이메일 |</Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </ListItem>
                <ListItem>
                  <Button onClick={() => signOut()} variant="contained">
                    로그아웃
                  </Button>
                </ListItem>
              </List>
            </Box>
            {!!user.name && <MyUserComments username={user.name} />}
          </>
        ) : (
          <Box>
            <Typography variant="body1">
              계정 정보가 없습니다. 로그인해 주세요!
            </Typography>
            <br />
            <Button onClick={() => signIn()} variant="contained">
              로그인
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
