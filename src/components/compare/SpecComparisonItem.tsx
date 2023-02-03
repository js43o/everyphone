import { Grid, Box, Typography, List, ListItem } from '@mui/material';

const TitleBlock = (props: { title: string }) => (
  <Grid
    item
    xs={3}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box
      sx={{
        flexShrink: 0,
      }}
    >
      <Typography variant="subtitle1">{props.title}</Typography>
    </Box>
  </Grid>
);

const SpecComparisonEachItem = (props: { content?: string | string[] }) => {
  const { content } = props;

  if (!content)
    return (
      <Grid item xs={4.5}>
        -
      </Grid>
    );

  return (
    <Grid
      item
      xs={4.5}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
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
  );
};

export default function SpecComparisonItem(props: {
  title: string;
  content1?: string | string[];
  content2?: string | string[];
}) {
  const { title, content1, content2 } = props;

  return (
    <Grid
      container
      sx={{
        py: 1,
      }}
    >
      <SpecComparisonEachItem content={content1} />
      <TitleBlock title={title} />
      <SpecComparisonEachItem content={content2} />
    </Grid>
  );
}
