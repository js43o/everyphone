import { ChangeEvent, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Pagination,
  List,
  ListItem,
  Avatar,
  Divider,
  IconButton,
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

export default function CommentsSection(props: { phoneUrl: string }) {
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);

  const onFetchComments = useCallback(async () => {
    const response = await axios('/api/comments', {
      params: {
        phoneUrl: props.phoneUrl,
        page: currentPage,
      },
    });

    setComments(response.data.comments);
    setLastPage(response.data.lastPage);
  }, [props.phoneUrl, currentPage]);

  const onChangePage = (e: ChangeEvent<unknown>, newPage: number) => {
    if (currentPage === newPage) return;

    onFetchComments();
    setCurrentPage(newPage);
  };

  useEffect(() => {
    onFetchComments();
  }, [onFetchComments]);

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
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
        disablePadding
      >
        {comments.map((comment) => (
          <CommentItem key={comment.date} comment={comment} />
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
