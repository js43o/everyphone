import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
} from '@mui/material';
import { Comment } from 'utils/types';
import SetRatingButton from './SetRatingButton';

export default function CommentControlModal(props: {
  opened: boolean;
  mode: 'edit' | 'delete';
  comment: Comment;
  closeModal: () => void;
  refreshComments: () => void;
}) {
  const { opened, mode, comment, closeModal, refreshComments } = props;
  const [password, setPassword] = useState('');
  const [rating, setRating] = useState(comment.rating);
  const [contents, setContents] = useState(comment.contents);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeField = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: 'PASSWORD' | 'CONTENTS'
  ) => {
    switch (field) {
      case 'PASSWORD':
        if (e.target.value.length > 10) break;
        setPassword(e.target.value);
        break;
      case 'CONTENTS':
        if (e.target.value.length > 100) break;
        setContents(e.target.value);
        break;
    }
  };

  const handleClose = () => {
    setPassword('');
    setError(false);
    closeModal();
  };

  const handleSubmitEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.patch('/api/comment', {
        commentId: comment._id,
        password,
        rating,
        contents,
        hasAccount: comment.hasAccount,
      });
      handleClose();
      refreshComments();
    } catch (e) {
      setError(true);
      if ((e as AxiosError).response?.status === 401) {
        setErrorMessage('패스워드가 일치하지 않습니다.');
        return;
      }
      setErrorMessage('서버 에러');
    }
  };

  const handleSubmitDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.delete('/api/comment', {
        params: {
          commentId: comment._id,
          password,
          hasAccount: comment.hasAccount,
        },
      });
      handleClose();
      refreshComments();
    } catch (e) {
      setError(true);
      if ((e as AxiosError).response?.status === 401) {
        setErrorMessage('패스워드가 일치하지 않습니다.');
        return;
      }
      setErrorMessage('서버 에러');
    }
  };

  useEffect(() => {
    setContents(comment.contents);
    setRating(comment.rating);
  }, [opened, comment]);

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="comment-control-dialog-title"
      aria-describedby="comment-control-dialog-description"
    >
      <DialogTitle id="comment-control-dialog-title" variant="h3">
        {mode === 'edit' ? '댓글 수정' : '댓글 삭제'}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            flexGrow: 1,
          }}
          onSubmit={mode === 'edit' ? handleSubmitEdit : handleSubmitDelete}
          component="form"
        >
          {!comment.hasAccount ? (
            <>
              <DialogContentText id="comment-control-dialog-description">
                댓글 작성 시 패스워드를 {mode === 'edit' && '함께 '}입력해
                주세요.
              </DialogContentText>
              <TextField
                label="패스워드 확인"
                value={password}
                onChange={(e) => handleChangeField(e, 'PASSWORD')}
                error={error}
                helperText={error && errorMessage}
                type="password"
                size="small"
                autoFocus
                fullWidth
              />
            </>
          ) : (
            <DialogContentText id="comment-control-dialog-description">
              {mode === 'edit'
                ? '수정할 내용을 입력하세요.'
                : '정말 삭제하시겠습니까?'}
            </DialogContentText>
          )}
          {mode === 'edit' && (
            <>
              {comment.hasAccount && (
                <SetRatingButton rating={rating} setRating={setRating} />
              )}
              <TextField
                label="내용"
                value={contents}
                onChange={(e) => handleChangeField(e, 'CONTENTS')}
                InputProps={{ required: true }}
                rows={2}
                multiline
                fullWidth
              />
            </>
          )}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignSelf: 'flex-end',
            }}
          >
            <Button variant="outlined" onClick={handleClose}>
              취소
            </Button>
            <Button variant="contained" type="submit">
              {mode === 'edit' ? '수정' : '삭제'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
