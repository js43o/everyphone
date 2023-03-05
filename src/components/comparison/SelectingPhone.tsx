import Link from 'next/link';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Box, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Phone } from 'utils/types';
import { comparisonDevicesState, searchingModeState } from 'utils/atoms';
import RatioImage from 'components/common/RatioImage';

export default function SelectingPhone(props: { phone?: Phone; slot: 1 | 2 }) {
  const { phone, slot } = props;
  const setSearchingMode = useSetRecoilState(searchingModeState);
  const [comparisonDevice, setComparisonDevice] = useRecoilState(
    comparisonDevicesState
  );

  const openSearchSection = () => {
    setSearchingMode({
      opened: true,
      mode: `comparison_device${slot}`,
    });
  };

  const deselectDevice = () => {
    if (slot === 1) {
      setComparisonDevice([undefined, comparisonDevice[1]]);
      return;
    }
    setComparisonDevice([comparisonDevice[0], undefined]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 1,
      }}
    >
      {phone ? (
        <>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '40vw',
              maxHeight: 360,
            }}
          >
            <RatioImage
              src={`/images/phones/${phone.url}.png`}
              alt={phone.url}
              fill
              priority
              quality={100}
              sizes="40vw"
            />
          </Box>
          <Link href={`/phones/${phone.url}`}>
            <Typography variant="h2" sx={{ mb: 0 }}>
              {phone.name}
            </Typography>
            <Typography variant="subtitle1">{phone.korName}</Typography>
          </Link>
          <IconButton onClick={deselectDevice} aria-label="deselect a device">
            <RemoveCircleOutlineIcon fontSize="large" color="error" />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            onClick={openSearchSection}
            aria-label="search for device to select"
          >
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
          기기 추가
        </>
      )}
    </Box>
  );
}
