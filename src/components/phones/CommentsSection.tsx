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
  ListItem,
  Avatar,
  Divider,
  IconButton,
  TextField,
  Button,
  FormControl,
} from '@mui/material';
import { Comment } from 'utils/types';
import { getColorByTimeStr } from 'utils/methods';
import ClearIcon from '@mui/icons-material/Clear';

const CommentItem = (props: { comment: Comment }) => {
  const { username, date, contents } = props.comment;

  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        px: 1,
        py: 2,
      }}
      divider
    >
      <Avatar
        alt={username}
        sx={{ mr: 2, bgcolor: getColorByTimeStr(date.split(' ')[1]) }}
      >
        {username[0]}
      </Avatar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="subtitle1">{username}</Typography>
          <Typography variant="caption">{date}</Typography>
        </Box>
        <Typography variant="body1">{contents}</Typography>
      </Box>
      <IconButton sx={{ alignSelf: 'center' }}>
        <ClearIcon />
      </IconButton>
    </ListItem>
  );
};

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

  const onChangeField = (
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

  const onSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
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

  const onChangePage = (e: ChangeEvent<unknown>, newPage: number) => {
    if (currentPage === newPage) return;

    fetchComments(newPage);
    setCurrentPage(newPage);
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
      <Typography variant="h2">댓글</Typography>
      <Divider />
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
        onSubmit={(e) => onSubmitComment(e)}
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
            onChange={(e) => onChangeField(e, 'USERNAME')}
            InputProps={{ required: true }}
          />
          <TextField
            label="비밀번호"
            size="small"
            type="password"
            value={inputState.password}
            onChange={(e) => onChangeField(e, 'PASSWORD')}
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
            onChange={(e) => onChangeField(e, 'CONTENTS')}
            InputProps={{ required: true }}
          />
          <Button variant="contained" type="submit">
            작성
          </Button>
        </Box>
      </FormControl>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
        disablePadding
      >
        {comments.map((comment) => (
          <CommentItem key={`${comment.date}${v1()}`} comment={comment} />
        ))}
      </List>
      <Pagination
        count={lastPage}
        page={currentPage}
        onChange={onChangePage}
        sx={{
          alignSelf: 'center',
          py: 2,
        }}
      />
    </Box>
  );
}
