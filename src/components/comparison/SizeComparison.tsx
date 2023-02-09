import { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import { Phone } from 'utils/types';

const ImageWrapper = styled(Box)<{ layered: boolean; minWidth?: number }>`
  display: flex;
  flex-flow: wrap;
  align-items: flex-end;
  position: relative;
  min-width: ${({ layered, minWidth }) => layered && minWidth};
  img {
    position: ${({ layered }) => (layered ? 'absolute' : 'relative')};
    bottom: 0;
    opacity: 0.5;
    :first-of-type {
      border: 1px solid red;
    }
    :last-of-type {
      border: 1px solid blue;
    }
  }
`;

export default function SizeComparison(props: {
  device1?: Phone;
  device2?: Phone;
}) {
  const { device1, device2 } = props;
  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [layered, setLayered] = useState(true);

  const isSm = useMediaQuery(useTheme().breakpoints.down('sm'));
  const isMd = useMediaQuery(useTheme().breakpoints.down('md'));
  const offset = isSm ? 1.5 : isMd ? 2 : 3;

  const onVisibleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    slot: 1 | 2
  ) => {
    if (slot === 1) setVisible1(event.target.checked);
    if (slot === 2) setVisible2(event.target.checked);
  };

  const toggleLayered = () => setLayered(!layered);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: 2,
        borderRadius: 2,
        background: 'white',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2">크기 비교</Typography>
          <FormControlLabel
            control={
              <Switch
                value={layered}
                checked={layered}
                onChange={toggleLayered}
              />
            }
            label="레이어 뷰"
            labelPlacement="start"
          />
        </Box>
        <Divider />
        <FormGroup>
          {device1 && (
            <FormControlLabel
              control={
                <Switch
                  checked={visible1}
                  value={visible1}
                  onChange={(e) => onVisibleChange(e, 1)}
                  color="secondary"
                />
              }
              label={device1.name}
              labelPlacement="start"
            />
          )}
          {device2 && (
            <FormControlLabel
              control={
                <Switch
                  checked={visible2}
                  value={visible2}
                  onChange={(e) => onVisibleChange(e, 2)}
                  color="secondary"
                />
              }
              label={device2.name}
              labelPlacement="start"
            />
          )}
        </FormGroup>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'wrap',
          gap: 2,
          minHeight:
            Math.max(
              device1?.design.demension[0] || 100,
              device2?.design.demension[0] || 100
            ) * offset,
        }}
      >
        {!device1 && !device2 && (
          <Typography variant="body1">선택된 기기가 없습니다.</Typography>
        )}
        <ImageWrapper
          layered={layered}
          minWidth={
            Math.max(
              device1?.design.demension[1] || 0,
              device2?.design.demension[1] || 0
            ) * offset
          }
        >
          {device1 && visible1 && (
            <Image
              src={`/images/size/${device1.url}-front.webp`}
              alt={device1.url}
              height={device1.design.demension[0] * offset}
              width={device1.design.demension[1] * offset}
            />
          )}
          {device2 && visible2 && (
            <Image
              src={`/images/size/${device2.url}-front.webp`}
              alt={device2.url}
              height={device2.design.demension[0] * offset}
              width={device2.design.demension[1] * offset}
            />
          )}
        </ImageWrapper>
        <ImageWrapper
          layered={layered}
          minWidth={
            Math.max(
              device1?.design.demension[2] || 0,
              device2?.design.demension[2] || 0
            ) * offset
          }
        >
          {device1 && visible1 && (
            <Image
              src={`/images/size/${device1.url}-side.webp`}
              alt={device1.url}
              height={device1.design.demension[0] * offset}
              width={device1.design.demension[2] * offset}
            />
          )}
          {device2 && visible2 && (
            <Image
              src={`/images/size/${device2.url}-side.webp`}
              alt={device2.url}
              height={device2.design.demension[0] * offset}
              width={device2.design.demension[2] * offset}
            />
          )}
        </ImageWrapper>
      </Box>
    </Box>
  );
}
