import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
  useReducer,
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
import { Comment } from 'utils/types';
import CommentItem from './CommentItem';
import CommentDeleteModal from './CommentDeleteModal';

type InputState = {
  username: string;
  password: string;
  contents: string;
};

const initialState: InputState = {
  username: '',
  password: '',
  contents: '',
};

const reducer = (
  state: InputState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case 'USERNAME':
      return { ...state, username: action.payload };
    case 'PASSWORD':
      return { ...state, password: action.payload };
    case 'CONTENTS':
      return { ...state, contents: action.payload };
    case 'CLEAN_ALL':
      return initialState;
    default:
      return state;
  }
};

export default function CommentsSection(props: { phoneUrl: string }) {
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputState, dispatch] = useReducer(reducer, initialState);
  const [openModal, setOpenModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const handleChangeField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const { value } = e.target;
    if ((field === 'USERNAME' || field === 'PASSWORD') && value.length > 10) {
      return;
    }
    if (field === 'CONTENTS' && value.length > 100) return;

    dispatch({ type: field, payload: e.target.value });
  };

  const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputState.username || !inputState.password || !inputState.contents) {
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
    dispatch({ type: 'CLEAN_ALL', payload: '' });
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

  const selectCommentToDelete = (comment: Comment) => {
    setSelectedComment(comment);
    setOpenModal(true);
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
      <CommentDeleteModal
        open={openModal}
        closeModal={() => setOpenModal(false)}
        comment={selectedComment}
        refreshComments={refreshComments}
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
            key={`${comment.date}${v1()}`}
            comment={comment}
            selectCommentToDelete={() => selectCommentToDelete(comment)}
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
