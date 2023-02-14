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
  IconButton,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/system';
import { Phone } from 'utils/types';
import HandSizeModal from './HandSizeModal';
import { useRecoilValue } from 'recoil';
import { handSizeState } from 'utils/atoms';

const ImageWrapper = styled(Box)<{
  layered: number;
  minWidth?: number;
}>`
  display: flex;
  flex-flow: wrap;
  align-items: flex-end;
  position: relative;
  min-width: ${({ layered, minWidth }) => layered && minWidth};
  pointer-events: none;
  img {
    position: ${({ layered }) => (layered ? 'absolute' : 'relative')};
    left: 0;
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

export default function SizeComparisonSection(props: {
  device1?: Phone;
  device2?: Phone;
}) {
  const { device1, device2 } = props;
  const [layered, setLayered] = useState(true);
  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [handView, setHandView] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const handSize = useRecoilValue(handSizeState);

  const isSm = useMediaQuery(useTheme().breakpoints.down('sm'));
  const isMd = useMediaQuery(useTheme().breakpoints.down('md'));
  const offset = isSm ? 1.5 : isMd ? 2 : 3;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: 2,
        borderRadius: 2,
        bgcolor: 'bluegrey.lighter',
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
          <HandSizeModal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
          />
          <FormControlLabel
            control={
              <Switch
                value={layered}
                checked={layered}
                onChange={() => setLayered(!layered)}
                disabled={!device1 || !device2}
              />
            }
            label="레이어 뷰"
            labelPlacement="start"
          />
        </Box>
        <Divider />
        <FormGroup>
          <Box
            sx={{
              alignSelf: 'flex-end',
            }}
          >
            <IconButton onClick={() => setModalOpened(true)}>
              <SettingsIcon />
            </IconButton>
            <FormControlLabel
              control={
                <Switch
                  checked={handView}
                  value={handView}
                  onChange={(e) => setHandView(e.target.checked)}
                  color="secondary"
                  disabled={!device1 && !device2}
                />
              }
              label="더미 핸드"
              labelPlacement="start"
            />
          </Box>
          {device1 && (
            <FormControlLabel
              control={
                <Switch
                  checked={visible1}
                  value={visible1}
                  onChange={(e) => setVisible1(e.target.checked)}
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
                  onChange={(e) => setVisible2(e.target.checked)}
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
          gap: 1,
          position: 'relative',
          minHeight:
            Math.max(
              device1?.design.demension[0] || 0,
              device2?.design.demension[0] || 0,
              handSize
            ) * offset,
        }}
      >
        {!device1 && !device2 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <Typography variant="body1">선택된 기기가 없습니다.</Typography>
          </Box>
        ) : (
          <>
            {handView && (
              <Box
                sx={{
                  position: 'absolute',
                  opacity: 0.5,
                }}
              >
                <Image
                  src="/images/hand-icon.svg"
                  alt="hand"
                  width={handSize * offset * 0.65}
                  height={handSize * offset}
                />
              </Box>
            )}
            <ImageWrapper
              layered={layered ? 1 : 0}
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
              layered={layered ? 1 : 0}
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
          </>
        )}
      </Box>
      <Divider />
      {device1 && device2 && (
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
      )}
    </Box>
  );
}
