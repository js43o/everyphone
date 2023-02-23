import { Box, Typography, IconButton, ListItem, Avatar } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { getColorByTimeStr } from 'utils/methods';
import { Comment } from 'utils/types';

const CommentItem = (props: {
  comment: Comment;
  onDelete: (comment: Comment) => void;
}) => {
  const { comment, onDelete } = props;
  const { username, date, contents } = comment;

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
      <IconButton
        sx={{ alignSelf: 'center' }}
        onClick={() => onDelete(comment)}
      >
        <ClearIcon />
      </IconButton>
    </ListItem>
  );
};

export default CommentItem;
