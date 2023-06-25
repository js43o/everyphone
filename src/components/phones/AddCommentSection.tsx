import { FormEvent } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useCommentInputState from 'hooks/useCommentInputState';
import {
  validateCommentContents,
  validatePassword,
  validateUsername,
} from 'utils/validator';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import SetRatingButton from './SetRatingButton';

export default function AddCommentSection(props: {
  phoneUrl: string;
  activateAlert: (message: string) => void;
  refreshComments: () => void;
}) {
  const { phoneUrl, activateAlert, refreshComments } = props;
  const { inputState, handleChangeField, setRating, cleanAllFields } =
    useCommentInputState();
  const { data: session, status } = useSession();

  const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputState.contents) return;

    if (status === 'unauthenticated') {
      if (!inputState.username || !inputState.password) {
        return;
      }

      const usernameError = validateUsername(inputState.username);
      if (!!usernameError) {
        activateAlert(usernameError);
        return;
      }

      const passwordError = validatePassword(inputState.password);
      if (!!passwordError) {
        activateAlert(passwordError);
        return;
      }
    }

    const contentsError = validateCommentContents(inputState.contents);
    if (!!contentsError) {
      activateAlert(contentsError);
      return;
    }

    console.log(inputState);

    await axios.post('/api/comment', {
      phoneUrl,
      hasAccount: status === 'authenticated',
      username: session ? session.user?.name : inputState.username,
      imgSrc: session ? session.user?.image : '',
      password: !session && inputState.password,
      rating: inputState.rating,
      contents: inputState.contents,
    });

    refreshComments();
    cleanAllFields();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
      onSubmit={(e) => handleSubmitComment(e)}
      component="form"
    >
      <SetRatingButton rating={inputState.rating} setRating={setRating} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
        }}
      >
        {status === 'authenticated' ? (
          <Typography
            variant="subtitle1"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {session.user?.name}
            <CheckCircleIcon
              sx={{ fontSize: '1rem', color: 'primary.main', m: 0.5 }}
            />
          </Typography>
        ) : (
          <>
            <TextField
              label="닉네임"
              size="small"
              value={inputState.username}
              onChange={(e) => handleChangeField(e, 'USERNAME')}
              InputProps={{ required: true }}
            />
            <TextField
              label="패스워드"
              size="small"
              type="password"
              value={inputState.password}
              onChange={(e) => handleChangeField(e, 'PASSWORD')}
              InputProps={{ required: true }}
            />
          </>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'stretch',
          flexGrow: 1,
        }}
      >
        <TextField
          label="내용"
          rows={2}
          multiline
          fullWidth
          value={inputState.contents}
          onChange={(e) => handleChangeField(e, 'CONTENTS')}
          InputProps={{ required: true }}
        />
        <Button variant="contained" type="submit">
          작성
        </Button>
      </Box>
    </Box>
  );
}
