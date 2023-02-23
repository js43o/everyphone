import { useState, ChangeEvent } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
} from '@mui/material';
import { checkPassword } from 'utils/methods';
import { Comment } from 'utils/types';
import axios from 'axios';

export default function CommentDeleteModal(props: {
  open: boolean;
  comment: Comment | null;
  closeModal: () => void;
  fetchComments: () => Promise<void>;
}) {
  const { comment, open, closeModal, fetchComments } = props;
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value.length > 10) return;
    setValue(e.target.value);
  };

  const handleClose = () => {
    setValue('');
    setError(false);
    closeModal();
  };

  const handleDelete = async () => {
    if (!comment || !value) return;

    const checked = await checkPassword(value, comment.hashedPassword);

    if (!checked) {
      setError(true);
      return;
    }

    await axios.delete('/api/comment', {
      params: {
        commentId: comment._id,
      },
    });

    handleClose();
    fetchComments();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>댓글 삭제</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <DialogContentText>
          댓글 작성 시 비밀번호를 입력해주세요.
        </DialogContentText>
        <TextField
          value={value}
          onChange={handleChange}
          autoFocus
          type="password"
          fullWidth
          error={error}
          helperText={error && '비밀번호가 일치하지 않습니다.'}
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
          <Button variant="contained" onClick={handleDelete}>
            삭제
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
