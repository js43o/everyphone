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

export default function CommentControlModal(props: {
  opened: boolean;
  mode: 'edit' | 'delete';
  comment: Comment;
  closeModal: () => void;
  refreshComments: () => void;
}) {
  const { opened, mode, comment, closeModal, refreshComments } = props;
  const [password, setPassword] = useState('');
  const [contents, setContents] = useState(comment.contents);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeField = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: 'password' | 'contents'
  ) => {
    if (field === 'password') {
      if (e.target.value.length > 10) return;
      setPassword(e.target.value);
      return;
    }

    if (e.target.value.length > 100) return;
    setContents(e.target.value);
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
        password: password,
        contents: contents,
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
          password: password,
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
  }, [opened, comment]);

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
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
          <DialogContentText id="comment-control-dialog-description">
            댓글 작성 시 패스워드를 입력해 주세요.
          </DialogContentText>
          <TextField
            label="패스워드 확인"
            value={password}
            onChange={(e) => handleChangeField(e, 'password')}
            error={error}
            helperText={error && errorMessage}
            type="password"
            size="small"
            autoFocus
            fullWidth
          />
          {mode === 'edit' && (
            <TextField
              label="내용"
              value={contents}
              onChange={(e) => handleChangeField(e, 'contents')}
              InputProps={{ required: true }}
              rows={2}
              multiline
              fullWidth
            />
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
