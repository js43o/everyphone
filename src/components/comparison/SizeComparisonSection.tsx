import { useMemo, useState } from 'react';
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
import { Phone } from 'utils/types';
import { handSizeState } from 'utils/atoms';
import { calculateViewSize } from 'utils/methods';
import useSizeViewState from 'hooks/useSizeViewState';
import HandSizeModal from './HandSizeModal';
import SizeSectionDeviceImage from './SizeSectionDeviceImage';
import SizeComparisonTable from './SizeComparisonTable';

export default function SizeComparisonSection(props: {
  device1?: Phone;
  device2?: Phone;
}) {
  const { device1, device2 } = props;
  const [modalOpened, setModalOpened] = useState(false);
  const { viewState, handleChangeView } = useSizeViewState();
  const handSize = useRecoilValue(handSizeState);

  const viewSize = useMemo(
    () =>
      calculateViewSize(
        handSize,
        device1?.design.demension,
        device2?.design.demension
      ),
    [handSize, device1, device2]
  );

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
                onChange={() => handleChangeView('LAYERED')}
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
                  onChange={() => handleChangeView('DUMMY_HAND')}
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
                  onChange={() => handleChangeView('DEVICE_ONE')}
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
                  onChange={() => handleChangeView('DEVICE_TWO')}
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
          height: viewSize.container.height,
          maxHeight: viewSize.container.maxHeight,
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
                  width: viewSize.hand.width,
                  height: viewSize.hand.height,
                  maxWidth: viewSize.hand.maxWidth,
                  maxHeight: viewSize.hand.maxHeight,
                  opacity: 0.5,
                }}
              >
                <Image
                  src="/images/hand-icon.svg"
                  alt="hand"
                  fill
                  sizes={viewSize.hand.width}
                />
              </Box>
            )}
            <SizeSectionDeviceImage
              type="front"
              layered={viewState.layered}
              deviceViewSizes={[viewSize.device1, viewSize.device2]}
              deviceVisible={[
                !!device1 && viewState.device1,
                !!device2 && viewState.device2,
              ]}
              deviceUrls={[device1?.url, device2?.url]}
            />
            <SizeSectionDeviceImage
              type="side"
              layered={viewState.layered}
              deviceViewSizes={[viewSize.device1, viewSize.device2]}
              deviceVisible={[
                !!device1 && viewState.device1,
                !!device2 && viewState.device2,
              ]}
              deviceUrls={[device1?.url, device2?.url]}
            />
          </>
        )}
      </Box>
      <Divider />
      {device1 && device2 && (
        <SizeComparisonTable device1={device1} device2={device2} />
      )}
    </Box>
  );
}
