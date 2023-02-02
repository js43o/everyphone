import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';
import { Phone } from 'utils/types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';

const PhoneImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 320px;
  object-fit: contain;
`;

export default function SelectedPhoneImage(props: { phone: Phone | null }) {
  const { phone } = props;

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
          }}
        >
          <IconButton>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
          기기 추가
        </Box>
      )}
    </Box>
  );
}
