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
  useMediaQuery,
  useTheme,
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

  const isSm = useMediaQuery(useTheme().breakpoints.down('sm'));
  const isMd = useMediaQuery(useTheme().breakpoints.down('md'));
  const offset = isSm ? 1.5 : isMd ? 2 : 3;

  const [device1Height, device1Width, device1Thickness] = device1
    ? device1.design.demension.map((value) => value * offset)
    : [0, 0, 0];
  const [device2Height, device2Width, device2Thickness] = device2
    ? device2.design.demension.map((value) => value * offset)
    : [0, 0, 0];

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
          flexFlow: 'wrap',
          gap: 1,
          position: 'relative',
          minHeight: Math.max(device1Height, device2Height, handSize * offset),
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
            <ImageWrapper
              layered={viewState.layered ? 1 : 0}
              minWidth={Math.max(device1Width, device2Width)}
            >
              {viewState.handDummy && (
                <Box
                  sx={{
                    position: 'absolute',
                    width: handSize * offset * 0.65,
                    height: handSize * offset,
                    bottom: 0,
                  }}
                >
                  <Image
                    src="/images/hand-icon.svg"
                    alt="hand"
                    fill
                    style={{ border: 'none' }}
                  />
                </Box>
              )}
              {device1 && viewState.device1 && (
                <Image
                  src={`/images/size/${device1.url}-front.webp`}
                  alt={device1.url}
                  height={device1Height}
                  width={device1Width}
                />
              )}
              {device2 && viewState.device2 && (
                <Image
                  src={`/images/size/${device2.url}-front.webp`}
                  alt={device2.url}
                  height={device2Height}
                  width={device2Width}
                />
              )}
            </ImageWrapper>
            <ImageWrapper layered={viewState.layered ? 1 : 0}>
              {device1 && viewState.device1 && (
                <Image
                  src={`/images/size/${device1.url}-side.webp`}
                  alt={device1.url}
                  height={device1Height}
                  width={device1Thickness}
                />
              )}
              {device2 && viewState.device2 && (
                <Image
                  src={`/images/size/${device2.url}-side.webp`}
                  alt={device2.url}
                  height={device2Height}
                  width={device2Thickness}
                />
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
