import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { Box, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Phone } from 'utils/types';
import { comparisonDevicesState, searchingModeState } from 'utils/atoms';

const PhoneImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 320px;
  object-fit: contain;
`;

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
          <PhoneImage src={`/images/phones/${phone.url}.png`} alt={phone.url} />
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
