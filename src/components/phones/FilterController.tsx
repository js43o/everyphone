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
  Collapse,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { defaultFilterPhoneQuery, FilterPhoneQuery } from 'utils/types';
import { convertToDataFormat, convertToRangeFormat } from 'utils/methods';
import { MANUFACTURER } from 'utils/constants';
import { filterPhoneQueryState } from 'utils/atoms';
import ByteRangeSlider from './ByteRangeSlider';

export default function FilterController() {
  const [openController, setOpenController] = useState(true);
  const [filterPhoneQuery, setFilterPhoneQuery] = useRecoilState(
    filterPhoneQueryState
  );
  const [localQuery, setLocalQuery] =
    useState<Omit<FilterPhoneQuery, 'sortBy'>>(filterPhoneQuery);
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
    setLocalQuery(defaultFilterPhoneQuery);
  };

  const onResetQuery = (field: keyof typeof defaultFilterPhoneQuery) =>
    setLocalQuery({
      ...localQuery,
      [field]: defaultFilterPhoneQuery[field],
    });

  const onApplyQuery = () => {
    setFilterPhoneQuery({ ...localQuery, sortBy: filterPhoneQuery.sortBy });
  };

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
        <Button
          onClick={() => setOpenController(!openController)}
          sx={{
            px: 2,
            flexShrink: 0,
          }}
        >
          <Typography variant="subtitle1">필터</Typography>
          {openController ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            gap: 0.5,
            alignItems: 'center',
            overflowX: 'scroll',
            msOverflowStyle: 'none',
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {Object.entries(localQuery).map((query) => {
            const key = query[0] as keyof typeof defaultFilterPhoneQuery;
            if (
              query[0] === 'sortBy' ||
              query[1] === defaultFilterPhoneQuery[key]
            ) {
              return;
            }

            if (query[0] === 'manufacturer') {
              return (
                <Chip
                  key={key}
                  label={(query[1] as string[]).join('/')}
                  onDelete={() => onResetQuery(key)}
                ></Chip>
              );
            }

            return (
              <Chip
                key={key}
                label={convertToRangeFormat(query[0], query[1] as number[])}
                onDelete={() => onResetQuery(key)}
              />
            );
          })}
        </Box>
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
            <Typography variant="subtitle1">제조사</Typography>
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
            <Typography variant="subtitle1">화면 크기</Typography>
            <Slider
              min={defaultFilterPhoneQuery.height[0]}
              max={defaultFilterPhoneQuery.height[1]}
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
            <Typography variant="subtitle1">저장 용량</Typography>
            <ByteRangeSlider
              min={defaultFilterPhoneQuery.storage[0]}
              max={defaultFilterPhoneQuery.storage[1]}
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
            <Typography variant="subtitle1">배터리</Typography>
            <Slider
              min={defaultFilterPhoneQuery.battery[0]}
              max={defaultFilterPhoneQuery.battery[1]}
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
            <Typography variant="subtitle1">무게</Typography>
            <Slider
              min={defaultFilterPhoneQuery.weight[0]}
              max={defaultFilterPhoneQuery.weight[1]}
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
