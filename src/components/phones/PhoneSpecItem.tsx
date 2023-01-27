import { Grid, Typography, List, ListItem } from '@mui/material';

export default function PhoneSpecItem(props: {
  title: string;
  content: string | string[];
}) {
  const { title, content } = props;
  return (
    <Grid container component="li">
      <Grid item xs={4}>
        <Typography variant="semibold">{title}</Typography>
      </Grid>
      <Grid item xs={8}>
        {typeof content === 'string' ? (
          content
        ) : (
          <List disablePadding>
            {content.map((str) => (
              <ListItem key={str} disablePadding>
                {str}
              </ListItem>
            ))}
          </List>
        )}
      </Grid>
    </Grid>
  );
}
