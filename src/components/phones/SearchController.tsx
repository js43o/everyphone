import { useState } from 'react';
import {
  Box,
  Slider,
  Divider,
  Typography,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import ByteRangeSlider from './ByteRangeSlider';
import { convertToDataFormat } from 'lib/methods';
import { SelectChangeEvent } from '@mui/material/Select';
import { defaultSearchPhoneQuery, SearchPhoneQuery } from 'lib/types';
import axios from 'axios';
import { MANUFACTURER } from 'lib/constants';
import { useSetRecoilState } from 'recoil';
import { phonesState } from 'lib/atoms';
import queryString from 'query-string';

export default function SearchController() {
  const [searchPhoneQuery, setSearchPhoneQuery] = useState<SearchPhoneQuery>(
    defaultSearchPhoneQuery
  );
  const setPhones = useSetRecoilState(phonesState);

  const onChangeMultiSelectorQuery = (
    e: SelectChangeEvent<string[]>,
    field: string
  ) => {
    const {
      target: { value },
    } = e;
    setSearchPhoneQuery({
      ...searchPhoneQuery,
      [field]: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const onChangeRangeQuery = (field: string, newValue: number | number[]) => {
    setSearchPhoneQuery({
      ...searchPhoneQuery,
      [field]: newValue as number[],
    });
  };

  const onResetQuery = () => setSearchPhoneQuery(defaultSearchPhoneQuery);

  const onFetchPhones = async () => {
    const response = await axios.get(
      `/api/phones?${queryString.stringify(searchPhoneQuery)}`
    );
    setPhones(response.data);
  };

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
          size="small"
          value={searchPhoneQuery.manufacturer}
          onChange={(e) => onChangeMultiSelectorQuery(e, 'manufacturer')}
          renderValue={(value) => {
            if (value.length <= 0) return '전체';
            if (value.length == 1) return value;
            return `${value.length}개 선택됨`;
          }}
          displayEmpty={true}
        >
          {MANUFACTURER.map((name) => (
            <MenuItem key={name} value={name}>
              <Typography variant="body1">{name}</Typography>
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Divider />
      <Box>
        <h3>화면 크기</h3>
        <Slider
          min={defaultSearchPhoneQuery.height[0]}
          max={defaultSearchPhoneQuery.height[1]}
          step={10}
          value={searchPhoneQuery.height}
          onChange={(e, newValue) => onChangeRangeQuery('height', newValue)}
          valueLabelDisplay="off"
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2">
            {searchPhoneQuery.height[0]} mm
          </Typography>
          <Typography variant="body2">
            {searchPhoneQuery.height[1]} mm
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box>
        <h3>저장 용량</h3>
        <ByteRangeSlider
          min={defaultSearchPhoneQuery.storage[0]}
          max={defaultSearchPhoneQuery.storage[1]}
          value={searchPhoneQuery.storage}
          setter={(newValue: number[]) =>
            onChangeRangeQuery('storage', newValue)
          }
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2">
            {convertToDataFormat(2 ** searchPhoneQuery.storage[0])}
          </Typography>
          <Typography variant="body2">
            {convertToDataFormat(2 ** searchPhoneQuery.storage[1])}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box>
        <h3>배터리</h3>
        <Slider
          min={defaultSearchPhoneQuery.battery[0]}
          max={defaultSearchPhoneQuery.battery[1]}
          step={500}
          value={searchPhoneQuery.battery}
          onChange={(e, newValue) => onChangeRangeQuery('battery', newValue)}
          valueLabelDisplay="off"
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2">
            {searchPhoneQuery.battery[0]} mAh
          </Typography>
          <Typography variant="body2">
            {searchPhoneQuery.battery[1]} mAh
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box>
        <h3>무게</h3>
        <Slider
          min={defaultSearchPhoneQuery.weight[0]}
          max={defaultSearchPhoneQuery.weight[1]}
          step={50}
          value={searchPhoneQuery.weight}
          onChange={(e, newValue) => onChangeRangeQuery('weight', newValue)}
          valueLabelDisplay="off"
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2">
            {searchPhoneQuery.weight[0]} g
          </Typography>
          <Typography variant="body2">
            {searchPhoneQuery.weight[1]} g
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Button variant="contained" onClick={onFetchPhones}>
        적용
      </Button>
      <Button variant="outlined" onClick={onResetQuery}>
        초기화
      </Button>
    </Box>
  );
}
