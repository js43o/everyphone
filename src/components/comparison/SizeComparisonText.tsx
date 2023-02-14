import { Box, Typography } from '@mui/material';
import { Phone } from 'utils/types';

export default function SizeComparisonText(props: {
  device1: Phone;
  device2: Phone;
}) {
  const { device1, device2 } = props;

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="body1">
        <b>{device1.name}</b>에 비해 <b>{device2.name}</b>이 세로로{' '}
        <b>
          {Math.abs(
            device2.design.demension[1] - device1.design.demension[1]
          ).toFixed(2)}
          mm
        </b>
        {device2.design.demension[1] > device1.design.demension[1]
          ? ' 더 크며, '
          : ' 더 작으며, '}
        가로로{' '}
        <b>
          {Math.abs(
            device2.design.demension[0] - device1.design.demension[0]
          ).toFixed(2)}
          mm
        </b>
        {device2.design.demension[0] > device1.design.demension[0]
          ? ' 더 큽니다.'
          : ' 더 작습니다.'}
      </Typography>
      <Typography variant="body1">
        두께는{' '}
        <b>
          {Math.abs(
            device2.design.demension[2] - device1.design.demension[2]
          ).toFixed(2)}
          mm
        </b>
        {device2.design.demension[2] > device1.design.demension[2]
          ? ' 더 두껍습니다.'
          : ' 더 얇습니다.'}
      </Typography>
    </Box>
  );
}
