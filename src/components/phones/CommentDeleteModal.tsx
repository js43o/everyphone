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
import { checkPassword } from 'utils/methods';
import { Comment } from 'utils/types';

export default function CommentDeleteModal(props: {
  open: boolean;
  comment: Comment | null;
  closeModal: () => void;
  refreshComments: () => void;
}) {
  const { comment, open, closeModal, refreshComments } = props;
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value.length > 10) return;
    setInputValue(e.target.value);
  };

  const handleClose = () => {
    setInputValue('');
    setError(false);
    closeModal();
  };

  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return;

    const checked = await checkPassword(inputValue, comment.hashedPassword);
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
    refreshComments();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle variant="h3" id="delete-comment-dialog-title">
        댓글 삭제
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-comment-dialog-description">
          댓글 작성 시 패스워드를 입력해주세요.
        </DialogContentText>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            mt: 1,
          }}
          onSubmit={(e) => handleDelete(e)}
          component="form"
        >
          <TextField
            value={inputValue}
            onChange={handleChange}
            type="password"
            size="small"
            error={error}
            helperText={error && '패스워드가 일치하지 않습니다.'}
            autoFocus
            fullWidth
            aria-labelledby="delete-comment-dialog-title"
            aria-describedby="delete-comment-dialog-description"
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
              삭제
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
