import { memo } from 'react';
import { Box, Typography, IconButton, ListItem, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { Comment } from 'utils/types';
import RatingStar from 'components/phones/RatingStar';
import RatioImage from 'components/common/RatioImage';
import useCurrentMedia from 'hooks/useCurrentMedia';
import Link from 'next/link';

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
        <Link href={`/phones/${phoneUrl}`}>
          <RatioImage
            src={`/images/phones/${phoneUrl}.png`}
            alt={phoneUrl}
            width={80}
          />
        </Link>
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
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
            }}
          >
            <Link href={`/phones/${phoneUrl}`}>
              <Typography
                variant="subtitle1"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {phoneName}
              </Typography>
            </Link>
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
