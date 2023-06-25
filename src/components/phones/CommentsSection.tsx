import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import axios from 'axios';
import { Box, Typography, Pagination, List, Divider } from '@mui/material';
import CommentItem from './CommentItem';
import CommentControlModal from './CommentControlModal';
import AlertModal from 'components/common/AlertModal';
import useAlertModal from 'hooks/useAlertModal';
import { Comment } from 'utils/types';
import { useSession } from 'next-auth/react';
import AddCommentSection from './AddCommentSection';

export default function CommentsSection(props: { phoneUrl: string }) {
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const { data: session } = useSession();

  const [modalOpened, setModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'delete'>('delete');
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const { alertOpened, errorMessage, activateAlert, closeAlert } =
    useAlertModal();

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
      <AlertModal
        open={alertOpened}
        title="입력 에러"
        description={errorMessage}
        handleClose={closeAlert}
      />
      <Typography variant="h2">댓글</Typography>
      <Divider />
      <AddCommentSection
        phoneUrl={props.phoneUrl}
        activateAlert={activateAlert}
        refreshComments={refreshComments}
      />
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
            key={comment._id}
            comment={comment}
            accessible={
              session?.user
                ? comment.hasAccount && session?.user.name === comment.username
                : !comment.hasAccount
            }
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
