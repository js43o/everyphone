import { useRecoilState, useSetRecoilState } from 'recoil';
import { Box, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Phone } from 'utils/types';
import { comparisonDevicesState, searchingModeState } from 'utils/atoms';
import RatioImage from 'components/common/RatioImage';
import Image from 'next/image';

export default function SelectingPhone(props: { phone?: Phone; slot: 1 | 2 }) {
  const { phone, slot } = props;
  const setSearchingMode = useSetRecoilState(searchingModeState);
  const [comparisonDevice, setComparisonDevice] = useRecoilState(
    comparisonDevicesState
  );

  const onOpenSearching = () => {
    setSearchingMode({
      opened: true,
      mode: `comparison_device${slot}`,
    });
  };

  const unselectDevice = () => {
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
          <Typography variant="h2" mb={0}>
            {phone.name}
          </Typography>
          <Typography variant="subtitle1">{phone.korName}</Typography>
          <IconButton onClick={unselectDevice}>
            <RemoveCircleOutlineIcon fontSize="large" color="error" />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton onClick={onOpenSearching}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
          기기 추가
        </>
      )}
    </Box>
  );
}
