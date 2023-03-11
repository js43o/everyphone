import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import axios from 'axios';
import { v1 } from 'uuid';
import {
  Box,
  Typography,
  Pagination,
  List,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import CommentItem from './CommentItem';
import CommentControlModal from './CommentControlModal';
import AlertModal from 'components/common/AlertModal';
import useCommentInputState from 'hooks/useCommentInputState';
import useAlertModal from 'hooks/useAlertModal';
import {
  validateUsername,
  validatePassword,
  validateCommentContents,
} from 'utils/validator';
import { Comment } from 'utils/types';

export default function CommentsSection(props: { phoneUrl: string }) {
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);

  const [modalOpened, setModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'delete'>('delete');
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const { inputState, handleChangeField, cleanAllFields } =
    useCommentInputState();
  const { alertOpened, errorMessage, activateAlert, closeAlert } =
    useAlertModal();

  const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputState.username || !inputState.password || !inputState.contents) {
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

    const contentsError = validateCommentContents(inputState.contents);
    if (!!contentsError) {
      activateAlert(contentsError);
      return;
    }

    await axios.post('/api/comment', {
      phoneUrl: props.phoneUrl,
      username: inputState.username,
      password: inputState.password,
      contents: inputState.contents,
    });

    setCurrentPage(1);
    fetchComments(1);
    cleanAllFields();
  };

  const fetchComments = useCallback(
    async (page: number) => {
      const response = await axios('/api/comments', {
        params: {
          phoneUrl: props.phoneUrl,
          page,
        },
      });

      setComments(response.data.comments);
      setLastPage(response.data.lastPage);
    },
    [props.phoneUrl]
  );

  const handleChangePage = (e: ChangeEvent<unknown>, newPage: number) => {
    if (currentPage === newPage) return;

    fetchComments(newPage);
    setCurrentPage(newPage);
  };

  const selectModeAndComment = (comment: Comment, mode: 'edit' | 'delete') => {
    setSelectedComment(comment);
    setModalMode(mode);
    setModalOpened(true);
  };

  const refreshComments = () => {
    fetchComments(1);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchComments(1);
  }, [fetchComments]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: 2,
        borderRadius: 2,
        bgcolor: 'bluegrey.lighter',
      }}
    >
      {selectedComment && (
        <CommentControlModal
          opened={modalOpened}
          mode={modalMode}
          comment={selectedComment}
          closeModal={() => setModalOpened(false)}
          refreshComments={refreshComments}
        />
      )}
      <AlertModal
        open={alertOpened}
        title="입력 에러"
        description={errorMessage}
        handleClose={closeAlert}
      />
      <Typography variant="h2">댓글</Typography>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
        onSubmit={(e) => handleSubmitComment(e)}
        component="form"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
          }}
        >
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
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
        disablePadding
      >
        {comments.map((comment) => (
          <CommentItem
            key={`${comment.date}-${v1()}`}
            comment={comment}
            handleClickEdit={() => selectModeAndComment(comment, 'edit')}
            handleClickDelete={() => selectModeAndComment(comment, 'delete')}
          />
        ))}
      </List>
      <Pagination
        count={lastPage}
        page={currentPage}
        onChange={handleChangePage}
        sx={{
          alignSelf: 'center',
          py: 2,
        }}
      />
    </Box>
  );
}
