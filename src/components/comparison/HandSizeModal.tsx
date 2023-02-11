import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Modal,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import { handSizeState } from 'utils/atoms';
import { isNumber, trimToRange } from 'utils/methods';

export default function HandSizeModal(props: {
  opened: boolean;
  onClose: () => void;
}) {
  const { opened, onClose } = props;
  const [handSize, setHandSize] = useRecoilState(handSizeState);
  const [value, setValue] = useState(handSize);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (!isNumber(input) || input.length > 3 || Number(input) === value) return;

    setValue(Number(input));
  };

  const handleSubmit = () => {
    const trimed = trimToRange(value, 100, 250);
    setHandSize(trimed);
    setValue(trimed);
    onClose();
  };

  const handleClose = () => {
    setValue(handSize);
    onClose();
  };

  return (
    <Modal
      open={opened}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'bluegrey.lighter',
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Box>
          <Typography variant="h3">더미 핸드 크기</Typography>
          <Typography variant="body2">
            손바닥 끝부터 중지 끝까지의 길이를 입력해주세요.
          </Typography>
        </Box>
        <TextField
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>,
          }}
          value={value}
          onChange={handleChange}
          helperText="최소 100 mm - 최대 250 mm"
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
            flexGrow: 1,
          }}
        >
          <Button variant="outlined" onClick={handleClose}>
            취소
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            적용
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
