import { Box, Typography, IconButton, ListItem, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { getColorByTimeStr } from 'utils/methods';
import { Comment } from 'utils/types';

const CommentItem = (props: {
  comment: Comment;
  handleClickEdit: () => void;
  handleClickDelete: () => void;
}) => {
  const { comment, handleClickEdit, handleClickDelete } = props;
  const { username, date, contents } = comment;

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
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle1">{username}</Typography>
          <Box>
            <IconButton sx={{ alignSelf: 'center' }} onClick={handleClickEdit}>
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{ alignSelf: 'center' }}
              onClick={handleClickDelete}
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

export default CommentItem;
