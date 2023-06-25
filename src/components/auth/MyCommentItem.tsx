import { memo } from 'react';
import { Box, Typography, IconButton, ListItem, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { Comment } from 'utils/types';
import RatingStar from 'components/phones/RatingStar';
import RatioImage from 'components/common/RatioImage';
import useCurrentMedia from 'hooks/useCurrentMedia';

const MyCommentItem = (props: {
  comment: Comment;
  handleComment: (comment: Comment, mode: 'edit' | 'delete') => void;
}) => {
  const { comment, handleComment } = props;
  const { phoneUrl, phoneName, date, rating, contents } = comment;
  const { isMobile } = useCurrentMedia();

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
      {!isMobile && (
        <RatioImage
          src={`/images/phones/${phoneUrl}.png`}
          alt={phoneUrl}
          width={80}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          ml: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
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
              {phoneName}
            </Typography>
            <RatingStar rating={rating} />
          </Box>
          <Typography variant="subtitle2"></Typography>
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
        </Box>
        <Typography variant="body1">{contents}</Typography>
        <Typography variant="caption" sx={{ mt: 1 }}>
          {date}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default memo(MyCommentItem);
