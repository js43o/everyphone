import { ChangeEvent, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, Pagination, List, Divider } from '@mui/material';
import CommentItem from './CommentItem';
import CommentControlModal from './CommentControlModal';
import AlertModal from 'components/common/AlertModal';
import useAlertModal from 'hooks/useAlertModal';
import { Comment } from 'utils/types';
import { useSession } from 'next-auth/react';
import AddCommentSection from './AddCommentSection';

export default function CommentsSection(props: {
  phoneUrl: string;
  phoneName: string;
}) {
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const { data: session } = useSession();

  const [modalOpened, setModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'delete'>('delete');
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const { alertOpened, errorMessage, activateAlert, closeAlert } =
    useAlertModal();
  const { phoneUrl, phoneName } = props;

  const fetchComments = useCallback(
    async (page: number) => {
      const response = await axios('/api/comments', {
        params: {
          phoneUrl,
          page,
        },
      });

      setComments(response.data.comments);
      setLastPage(response.data.lastPage);
    },
    [phoneUrl]
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

  const currentUserComment = comments.find(
    (comment) => comment.username === session?.user?.name
  );

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
      <Typography variant="h2">
        평가
        <Typography variant="body2" sx={{ mt: 1 }}>
          별점은 로그인한 사용자만 등록할 수 있습니다.
        </Typography>
      </Typography>
      <Divider />
      {session?.user && !!currentUserComment ? (
        <CommentItem
          key={currentUserComment._id}
          comment={currentUserComment}
          accessible={true}
          handleComment={handleComment}
        />
      ) : (
        <AddCommentSection
          phoneUrl={phoneUrl}
          phoneName={phoneName}
          activateAlert={activateAlert}
          refreshComments={refreshComments}
        />
      )}
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
        disablePadding
      >
        {comments
          .filter((comment) => currentUserComment?._id !== comment._id)
          .map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              accessible={
                session?.user
                  ? comment.hasAccount &&
                    session?.user.name === comment.username
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
