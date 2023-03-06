import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
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

export default function CommentUpdateModal(props: {
  open: boolean;
  comment: Comment;
  closeModal: () => void;
  refreshComments: () => void;
}) {
  const { comment, open, closeModal, refreshComments } = props;
  const [inputPassword, setInputPassword] = useState('');
  const [inputContents, setInputContents] = useState('');
  const [error, setError] = useState(false);

  const handleChangeField = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: 'password' | 'contents'
  ) => {
    if (field === 'password') {
      if (e.target.value.length > 10) return;
      setInputPassword(e.target.value);
      return;
    }
    if (e.target.value.length > 100) return;
    setInputContents(e.target.value);
  };

  const handleClose = () => {
    setInputPassword('');
    setError(false);
    closeModal();
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.patch('/api/comment', {
        commentId: comment._id,
        inputPassword,
        hashedPassword: comment.hashedPassword,
        contents: inputContents,
      });
      handleClose();
      refreshComments();
    } catch (e) {
      setError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle variant="h3">댓글 수정</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            mt: 1,
          }}
          onSubmit={(e) => handleUpdate(e)}
          component="form"
        >
          <TextField
            label="패스워드 확인"
            value={inputPassword}
            onChange={(e) => handleChangeField(e, 'password')}
            type="password"
            size="small"
            error={error}
            helperText={error && '패스워드가 일치하지 않습니다.'}
            autoFocus
            fullWidth
          />
          <TextField
            label="내용"
            rows={2}
            multiline
            fullWidth
            value={inputContents}
            onChange={(e) => handleChangeField(e, 'contents')}
            InputProps={{ required: true }}
          />
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
              수정
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
