import { Grid, Typography, List, ListItem } from '@mui/material';

export default function PhoneSpecItem(props: {
  title: string;
  content: string | string[];
}) {
  const { title, content } = props;
  return (
    <Grid container component="li">
      <Grid item xs={4}>
        <Typography variant="subtitle1">{title}</Typography>
      </Grid>
      <Grid item xs={8}>
        {typeof content === 'string' ? (
          <Typography variant="body1">{content}</Typography>
        ) : (
          <List disablePadding>
            {content.map((str) => (
              <ListItem key={str} disablePadding>
                <Typography variant="body1">{str}</Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Grid>
    </Grid>
  );
}
