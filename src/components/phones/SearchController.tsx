import { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import {
  Box,
  Slider,
  Divider,
  Typography,
  Select,
  MenuItem,
  Button,
  IconButton,
  Collapse,
  useTheme,
  useMediaQuery,
  Chip,
  List,
  ListItem,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { defaultSearchPhoneQuery, SearchPhoneQuery } from 'lib/types';
import { convertToDataFormat, convertToRangeFormat } from 'lib/methods';
import { MANUFACTURER } from 'lib/constants';
import { searchPhoneQueryState } from 'lib/atoms';
import ByteRangeSlider from './ByteRangeSlider';

export default function SearchController() {
  const [openController, setOpenController] = useState(true);
  const [localQuery, setLocalQuery] = useState<SearchPhoneQuery>(
    defaultSearchPhoneQuery
  );
  const setSearchPhoneQuery = useSetRecoilState(searchPhoneQueryState);
  const isMobile = useMediaQuery(useTheme().breakpoints.down('lg'));

  const onChangeMultiSelectorQuery = (
    e: SelectChangeEvent<string[]>,
    field: string
  ) => {
    const {
      target: { value },
    } = e;
    setLocalQuery({
      ...localQuery,
      [field]: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const onChangeRangeQuery = (field: string, newValue: number | number[]) => {
    setLocalQuery({
      ...localQuery,
      [field]: newValue as number[],
    });
  };

  const onResetQueryAll = () => {
    setLocalQuery(defaultSearchPhoneQuery);
  };

  const onResetQuery = (field: keyof typeof defaultSearchPhoneQuery) =>
    setLocalQuery({
      ...localQuery,
      [field]: defaultSearchPhoneQuery[field],
    });

  const onApplyQuery = () => setSearchPhoneQuery(localQuery);

  useEffect(() => {
    if (!isMobile) setOpenController(true);
  }, [isMobile]);

  return (
    <>
      <Box
        sx={{
          display: {
            xs: 'flex',
            lg: 'none',
          },
        }}
      >
        <IconButton onClick={() => setOpenController(!openController)}>
          <Typography variant="body1">필터</Typography>
          {openController ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        <List
          component="ul"
          sx={{
            display: 'flex',
            gap: 1,
            overflowY: 'scroll',
            msOverflowStyle: 'none',
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {Object.entries(localQuery).map((query) => {
            const key = query[0] as keyof typeof defaultSearchPhoneQuery;
            if (
              query[0] === 'manufacturer' ||
              query[1] === defaultSearchPhoneQuery[key]
            )
              return;
            return (
              <ListItem key={query[0]} disablePadding>
                <Chip
                  label={convertToRangeFormat(query[0], query[1] as number[])}
                  onDelete={() => onResetQuery(key)}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Collapse in={!isMobile || openController} timeout="auto" unmountOnExit>
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
              value={localQuery.manufacturer}
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
              value={localQuery.height}
              onChange={(e, newValue) => onChangeRangeQuery('height', newValue)}
              valueLabelDisplay="off"
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2">{localQuery.height[0]} mm</Typography>
              <Typography variant="body2">{localQuery.height[1]} mm</Typography>
            </Box>
          </Box>
          <Divider />
          <Box>
            <h3>저장 용량</h3>
            <ByteRangeSlider
              min={defaultSearchPhoneQuery.storage[0]}
              max={defaultSearchPhoneQuery.storage[1]}
              value={localQuery.storage}
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
                {convertToDataFormat(2 ** localQuery.storage[0])}
              </Typography>
              <Typography variant="body2">
                {convertToDataFormat(2 ** localQuery.storage[1])}
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
              value={localQuery.battery}
              onChange={(e, newValue) =>
                onChangeRangeQuery('battery', newValue)
              }
              valueLabelDisplay="off"
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2">
                {localQuery.battery[0]} mAh
              </Typography>
              <Typography variant="body2">
                {localQuery.battery[1]} mAh
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
              value={localQuery.weight}
              onChange={(e, newValue) => onChangeRangeQuery('weight', newValue)}
              valueLabelDisplay="off"
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2">{localQuery.weight[0]} g</Typography>
              <Typography variant="body2">{localQuery.weight[1]} g</Typography>
            </Box>
          </Box>
          <Divider />
          <Button variant="contained" onClick={onApplyQuery}>
            적용
          </Button>
          <Button variant="outlined" onClick={onResetQueryAll}>
            초기화
          </Button>
        </Box>
      </Collapse>
    </>
  );
}
