import { useState } from 'react';
import {
  Box,
  Checkbox,
  Slider,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import ByteRangeSlider from './ByteRangeSlider';
import { convertToDataFormat } from 'lib/methods';

export default function SearchController() {
  const [manufacturer, setManufacturer] = useState<string[]>([]);
  const [storageSize, setStorageSize] = useState<number[]>([30, 40]);
  const [batterySize, setBatterySize] = useState<number[]>([1000, 10000]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        height: 'min-content',
        borderRadius: 2,
        padding: 2,
        background: 'white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h3>제조사</h3>
        <Select
          multiple
          value={manufacturer}
          onChange={(e) => {
            setManufacturer(e.target.value as string[]);
          }}
          renderValue={(value) => {
            if (value.length <= 0) return '전체';
            if (value.length == 1) return value;
            return `${value.length}개 선택됨`;
          }}
          displayEmpty={true}
        >
          {['삼성', '애플', '구글'].map((name) => (
            <MenuItem key={name} value={name}>
              <Typography variant="body1">{name}</Typography>
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Divider />
      <Box>
        <h3>화면 크기</h3>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="소형 (149 mm
          이하)"
          />
          <FormControlLabel control={<Checkbox />} label="중형 (150-179 mm)" />
          <FormControlLabel
            control={<Checkbox />}
            label="대형 (180 mm
          이상)"
          />
        </FormGroup>
      </Box>
      <Divider />
      <Box>
        <h3>저장 용량</h3>
        <ByteRangeSlider
          min={30}
          max={40}
          value={storageSize}
          setValue={setStorageSize}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2">
            {convertToDataFormat(2 ** storageSize[0])}
          </Typography>
          <Typography variant="body2">
            {convertToDataFormat(2 ** storageSize[1])}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box>
        <h3>배터리</h3>
        <Slider
          min={1000}
          max={10000}
          step={500}
          value={batterySize}
          onChange={(_, value) => setBatterySize(value as number[])}
          valueLabelFormat={(value) => `${value} mAh`}
          valueLabelDisplay="off"
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2">{batterySize[0]} mAh</Typography>
          <Typography variant="body2">{batterySize[1]} mAh</Typography>
        </Box>
      </Box>
      <Divider />
      <Button variant="outlined">초기화</Button>
    </Box>
  );
}
