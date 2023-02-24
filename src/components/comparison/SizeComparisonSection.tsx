import { useReducer, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
  IconButton,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/system';
import { Phone } from 'utils/types';
import { handSizeState } from 'utils/atoms';
import HandSizeModal from './HandSizeModal';
import SizeComparisonText from './SizeComparisonText';

const ImageWrapper = styled(Box)<{
  layered: number;
  width?: number;
  maxWidth?: number;
}>`
  display: flex;
  align-items: flex-end;
  position: relative;
  width: ${({ layered, width }) => (layered && width ? `${width}vw` : 'unset')};
  max-width: ${({ layered, maxWidth }) =>
    layered && maxWidth ? `${maxWidth}px` : 'unset'};
  pointer-events: none;
  div {
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

type ComparisonViewOptions = {
  layered: boolean;
  handDummy: boolean;
  device1: boolean;
  device2: boolean;
};

const initialOptions: ComparisonViewOptions = {
  layered: false,
  handDummy: false,
  device1: true,
  device2: true,
};

const reducer = (state: ComparisonViewOptions, action: { type: string }) => {
  switch (action.type) {
    case 'LAYERED':
      return { ...state, layered: !state.layered };
    case 'DUMMY_HAND':
      return { ...state, handDummy: !state.handDummy };
    case 'DEVICE_ONE':
      return { ...state, device1: !state.device1 };
    case 'DEVICE_TWO':
      return { ...state, device2: !state.device2 };
    default:
      return state;
  }
};

export default function SizeComparisonSection(props: {
  device1?: Phone;
  device2?: Phone;
}) {
  const { device1, device2 } = props;
  const [modalOpened, setModalOpened] = useState(false);
  const [viewState, dispatch] = useReducer(reducer, initialOptions);
  const handSize = useRecoilValue(handSizeState);

  const propotion = 70;
  const vwOffset =
    propotion /
    ((device1?.design.demension[1] || 70) +
      (device2?.design.demension[1] || 70));
  const pxOffset = 3;

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
                value={viewState.layered}
                checked={viewState.layered}
                onChange={() => dispatch({ type: 'LAYERED' })}
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
            <IconButton
              onClick={() => setModalOpened(true)}
              aria-label="open modal for dummy hand sizing"
            >
              <SettingsIcon />
            </IconButton>
            <FormControlLabel
              control={
                <Switch
                  checked={viewState.handDummy}
                  onChange={() => dispatch({ type: 'DUMMY_HAND' })}
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
                  checked={viewState.device1}
                  onChange={() => dispatch({ type: 'DEVICE_ONE' })}
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
                  checked={viewState.device2}
                  onChange={() => dispatch({ type: 'DEVICE_TWO' })}
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
          gap: 1,
          position: 'relative',
          height: `${
            Math.max(
              handSize,
              device1?.design.demension[0] || 1,
              device2?.design.demension[0] || 1
            ) * vwOffset
          }vw`,
          maxHeight: `${
            Math.max(
              handSize,
              device1?.design.demension[0] || 1,
              device2?.design.demension[0] || 1
            ) * pxOffset
          }px`,
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
            {viewState.handDummy && (
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 10,
                  width: `${handSize * vwOffset * 0.65}vw`,
                  height: `${handSize * vwOffset}vw`,
                  maxWidth: `${handSize * pxOffset * 0.65}px`,
                  maxHeight: `${handSize * pxOffset}px`,
                  opacity: 0.5,
                }}
              >
                <Image
                  src="/images/hand-icon.svg"
                  alt="hand"
                  fill
                  sizes={`${handSize * vwOffset * 0.65}vw`}
                />
              </Box>
            )}
            <ImageWrapper
              layered={viewState.layered ? 1 : 0}
              width={(device1?.design.demension[1] || 0) * vwOffset}
              maxWidth={(device1?.design.demension[1] || 0) * pxOffset}
            >
              {device1 && viewState.device1 && (
                <Box
                  sx={{
                    width: `${device1.design.demension[1] * vwOffset}vw`,
                    height: `${device1.design.demension[0] * vwOffset}vw`,
                    maxWidth: `${device1.design.demension[1] * pxOffset}px`,
                    maxHeight: `${device1.design.demension[0] * pxOffset}px`,
                  }}
                >
                  <Image
                    src={`/images/size/${device1.url}-front.webp`}
                    alt={device1.url}
                    fill
                    sizes={`${device1.design.demension[1] * vwOffset}vw`}
                  />
                </Box>
              )}
              {device2 && viewState.device2 && (
                <Box
                  sx={{
                    width: `${device2.design.demension[1] * vwOffset}vw`,
                    height: `${device2.design.demension[0] * vwOffset}vw`,
                    maxWidth: `${device2.design.demension[1] * pxOffset}px`,
                    maxHeight: `${device2.design.demension[0] * pxOffset}px`,
                  }}
                >
                  <Image
                    src={`/images/size/${device2.url}-front.webp`}
                    alt={device2.url}
                    fill
                    sizes={`${device2.design.demension[1] * vwOffset}vw`}
                  />
                </Box>
              )}
            </ImageWrapper>
            <ImageWrapper layered={viewState.layered ? 1 : 0}>
              {device1 && viewState.device1 && (
                <Box
                  sx={{
                    width: `${device1.design.demension[2] * vwOffset}vw`,
                    height: `${device1.design.demension[0] * vwOffset}vw`,
                    maxWidth: `${device1.design.demension[2] * pxOffset}px`,
                    maxHeight: `${device1.design.demension[0] * pxOffset}px`,
                  }}
                >
                  <Image
                    src={`/images/size/${device1.url}-side.webp`}
                    alt={device1.url}
                    fill
                    sizes={`${device1.design.demension[2] * vwOffset}vw`}
                  />
                </Box>
              )}
              {device2 && viewState.device2 && (
                <Box
                  sx={{
                    width: `${device2.design.demension[2] * vwOffset}vw`,
                    height: `${device2.design.demension[0] * vwOffset}vw`,
                    maxWidth: `${device2.design.demension[2] * pxOffset}px`,
                    maxHeight: `${device2.design.demension[0] * pxOffset}px`,
                  }}
                >
                  <Image
                    src={`/images/size/${device2.url}-side.webp`}
                    alt={device2.url}
                    fill
                    sizes={`${device2.design.demension[2] * vwOffset}vw`}
                  />
                </Box>
              )}
            </ImageWrapper>
          </>
        )}
      </Box>
      <Divider />
      {device1 && device2 && (
        <SizeComparisonText device1={device1} device2={device2} />
      )}
    </Box>
  );
}
