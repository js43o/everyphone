import { ChangeEvent, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, Pagination, List, ListItem } from '@mui/material';
import { Comment } from 'utils/types';
import { styled } from '@mui/system';

const CommentItem = (props: { comment: Comment }) => {
  const { username, date, contents } = props.comment;

  return (
    <ListItem
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderRadius: 2,
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
      <List
        sx={{
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
