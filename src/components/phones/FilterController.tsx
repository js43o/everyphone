import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
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

const FilterValueIndicator = (props: {
  minValue: string;
  maxValue: string;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="body2">{props.minValue}</Typography>
      <Typography variant="body2">{props.maxValue}</Typography>
    </Box>
  );
};

export default function FilterController() {
  const [openController, setOpenController] = useState(true);
  const [filterPhoneQuery, setFilterPhoneQuery] = useRecoilState(
    filterPhoneQueryState
  );
  const [localQuery, setLocalQuery] =
    useState<Omit<FilterPhoneQuery, 'sortBy'>>(filterPhoneQuery);
  const isMobile = useMediaQuery(useTheme().breakpoints.down('lg'));

  const handleChangeMultiSelectorQuery = (
    e: SelectChangeEvent<string[]>,
    field: string
  ) => {
    const { value } = e.target;
    setLocalQuery({
      ...localQuery,
      [field]: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleChangeRangeQuery = (
    field: string,
    newValue: number | number[]
  ) => {
    setLocalQuery({
      ...localQuery,
      [field]: newValue as number[],
    });
  };

  const resetAllQuery = () => {
    setLocalQuery(defaultFilterPhoneQuery);
  };

  const resetQuery = (field: keyof typeof defaultFilterPhoneQuery) =>
    setLocalQuery({
      ...localQuery,
      [field]: defaultFilterPhoneQuery[field],
    });

  const applyQuery = () => {
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
                  onDelete={() => resetQuery(key)}
                ></Chip>
              );
            }

            return (
              <Chip
                key={key}
                label={convertToRangeFormat(query[0], query[1] as number[])}
                onDelete={() => resetQuery(key)}
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
            padding: 2,
            borderRadius: 2,
            bgcolor: 'bluegrey.lighter',
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
              onChange={(e) =>
                handleChangeMultiSelectorQuery(e, 'manufacturer')
              }
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
              onChange={(e, newValue) =>
                handleChangeRangeQuery('height', newValue)
              }
              valueLabelDisplay="off"
            />
            <FilterValueIndicator
              minValue={`${localQuery.height[0]} mm`}
              maxValue={`${localQuery.height[1]} mm`}
            />
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle1">저장 용량</Typography>
            <ByteRangeSlider
              min={defaultFilterPhoneQuery.storage[0]}
              max={defaultFilterPhoneQuery.storage[1]}
              value={localQuery.storage}
              setter={(newValue: number[]) =>
                handleChangeRangeQuery('storage', newValue)
              }
            />
            <FilterValueIndicator
              minValue={convertToDataFormat(2 ** localQuery.storage[0])}
              maxValue={convertToDataFormat(2 ** localQuery.storage[1])}
            />
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
                handleChangeRangeQuery('battery', newValue)
              }
              valueLabelDisplay="off"
            />
            <FilterValueIndicator
              minValue={`${localQuery.battery[0]} mAh`}
              maxValue={`${localQuery.battery[1]} mAh`}
            />
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle1">무게</Typography>
            <Slider
              min={defaultFilterPhoneQuery.weight[0]}
              max={defaultFilterPhoneQuery.weight[1]}
              step={50}
              value={localQuery.weight}
              onChange={(e, newValue) =>
                handleChangeRangeQuery('weight', newValue)
              }
              valueLabelDisplay="off"
            />
            <FilterValueIndicator
              minValue={`${localQuery.weight[0]} g`}
              maxValue={`${localQuery.weight[1]} g`}
            />
          </Box>
          <Divider />
          <Button variant="contained" onClick={applyQuery}>
            적용
          </Button>
          <Button variant="outlined" onClick={resetAllQuery}>
            초기화
          </Button>
        </Box>
      </Collapse>
    </>
  );
}
