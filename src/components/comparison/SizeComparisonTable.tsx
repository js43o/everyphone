import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
} from '@mui/material';
import { Phone } from 'utils/types';

export default function SizeComparisonTable(props: {
  device1: Phone;
  device2: Phone;
}) {
  const { device1, device2 } = props;
  const devices = [device1, device2];

  return (
    <TableContainer>
      <Table size="small" aria-label="device size comparison table">
        <TableHead
          sx={{
            th: { wordBreak: 'keep-all' },
            bgcolor: 'bluegrey.main',
          }}
        >
          <TableCell>항목</TableCell>
          <TableCell align="right">가로 (mm)</TableCell>
          <TableCell align="right">세로 (mm)</TableCell>
          <TableCell align="right">두께 (mm)</TableCell>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.url}>
              <TableCell component="th" scope="row">
                {device.name}
              </TableCell>
              <TableCell align="right">{device.design.demension[1]}</TableCell>
              <TableCell align="right">{device.design.demension[0]}</TableCell>
              <TableCell align="right">{device.design.demension[2]}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell component="th" scope="row">
              차이
            </TableCell>
            {[0, 1, 2].map((index) => (
              <TableCell key={index} align="right">
                {Math.abs(
                  device1.design.demension[index] -
                    device2.design.demension[index]
                ).toFixed(1)}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
