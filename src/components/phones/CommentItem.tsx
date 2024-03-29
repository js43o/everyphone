import { memo, useEffect } from 'react';
import { Box, Typography, IconButton, ListItem, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getColorByTimeStr } from 'utils/methods';
import { Comment } from 'utils/types';
import RatingStar from './RatingStar';

const CommentItem = (props: {
  comment: Comment;
  accessible: boolean;
  handleComment: (comment: Comment, mode: 'edit' | 'delete') => void;
}) => {
  const { comment, accessible, handleComment } = props;
  const { username, date, rating, contents } = comment;

  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        px: 0,
        py: 1,
      }}
      divider
    >
      <Avatar
        alt={username}
        sx={{
          mt: 1,
          mr: 2,
          bgcolor: getColorByTimeStr(date.split(' ')[1]),
        }}
        src={comment.imgSrc}
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
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              alignItems: {
                xs: 'start',
                md: 'center',
              },
              gap: 0.5,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {username}
              {comment.hasAccount && (
                <CheckCircleIcon
                  sx={{ fontSize: '1rem', color: 'primary.main', m: 0.5 }}
                />
              )}
            </Typography>
            {rating > 0 && <RatingStar rating={rating} />}
          </Box>
          <Typography variant="subtitle2"></Typography>
          {accessible && (
            <Box>
              <IconButton
                sx={{ alignSelf: 'center' }}
                onClick={() => handleComment(comment, 'edit')}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{ alignSelf: 'center' }}
                onClick={() => handleComment(comment, 'delete')}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Typography variant="body1">{contents}</Typography>
        <Typography variant="caption" sx={{ mt: 1 }}>
          {date}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default memo(CommentItem);
