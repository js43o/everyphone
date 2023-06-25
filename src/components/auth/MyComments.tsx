import { ChangeEvent, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, Pagination, List, Divider } from '@mui/material';
import MyCommentItem from './MyCommentItem';
import CommentControlModal from '../phones/CommentControlModal';
import { Comment } from 'utils/types';

export default function MyComments(props: { username: string }) {
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);

  const [modalOpened, setModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'delete'>('delete');
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const { username } = props;

  const fetchComments = useCallback(
    async (page: number) => {
      const response = await axios('/api/comments', {
        params: {
          username,
          page,
        },
      });

      setComments(response.data.comments);
      setLastPage(response.data.lastPage);
    },
    [username]
  );

  const handleChangePage = (e: ChangeEvent<unknown>, newPage: number) => {
    if (currentPage === newPage) return;

    fetchComments(newPage);
    setCurrentPage(newPage);
  };

  const handleComment = useCallback(
    (comment: Comment, mode: 'edit' | 'delete') => {
      setSelectedComment(comment);
      setModalMode(mode);
      setModalOpened(true);
    },
    []
  );

  const refreshComments = useCallback(() => {
    setCurrentPage(1);
    fetchComments(1);
  }, [fetchComments]);

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
      <Typography variant="h2">평가 목록</Typography>
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
          <MyCommentItem
            key={comment._id}
            comment={comment}
            handleComment={handleComment}
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
