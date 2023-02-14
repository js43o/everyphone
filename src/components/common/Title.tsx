import { Typography } from '@mui/material';

export default function Title(props: { fontSize?: number }) {
  return (
    <Typography
      sx={{
        margin: 0,
        fontFamily: 'Bakbak One',
        fontWeight: 'normal',
        fontSize: `${props.fontSize || 2}rem`,
        lineHeight: 1,
      }}
    >
      Everyphone
    </Typography>
  );
}
