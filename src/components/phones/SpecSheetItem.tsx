import { Grid, Typography, List, ListItem } from '@mui/material';

export default function SpecSheetItem(props: {
  title: string;
  content: string | string[];
}) {
  const { title, content } = props;
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Grid item xs={4}>
        <Typography variant="subtitle1">{title}</Typography>
      </Grid>
      <Grid item xs={8}>
        {typeof content === 'string' ? (
          <Typography variant="body2">{content}</Typography>
        ) : (
          <List disablePadding>
            {content.map((str) => (
              <ListItem key={str} disablePadding>
                <Typography variant="body2">{str}</Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Grid>
    </Grid>
  );
}
