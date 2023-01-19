import { Box, Typography } from '@mui/material';

export default function Title(props: {
  children: React.ReactNode;
  fontSize?: number;
}) {
  return (
    <Box
      sx={{
        fontFamily: 'Bakbak One',
        fontWeight: 'normal',
        fontSize: `${props.fontSize || 2}rem`,
      }}
    >
      {props.children}
    </Box>
  );
}
