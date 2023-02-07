import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';
import { Box, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Phone } from 'utils/types';
import { searchingModeState } from 'utils/atoms';

const PhoneImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 320px;
  object-fit: contain;
`;

export default function SelectingPhone(props: { phone?: Phone; slot: 1 | 2 }) {
  const { phone, slot } = props;
  const setSearchingMode = useSetRecoilState(searchingModeState);

  const onOpenSearcing = () => {
    setSearchingMode({
      opened: true,
      mode: `comparison_device${slot}`,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {phone ? (
        <>
          <PhoneImage src={`/images/phones/${phone.url}.png`} alt={phone.url} />
          <Typography variant="h2" mb={0}>
            {phone.name}
          </Typography>
          <Typography variant="subtitle1">{phone.korName}</Typography>
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IconButton onClick={onOpenSearcing}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
          기기 추가
        </Box>
      )}
    </Box>
  );
}
