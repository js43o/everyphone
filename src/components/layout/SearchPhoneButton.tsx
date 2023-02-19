import { useEffect, useState, useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';
import Router from 'next/router';
import axios from 'axios';
import {
  Autocomplete,
  Box,
  Drawer,
  IconButton,
  TextField,
  Typography,
  ListItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Phone, SearchPhoneResult } from 'utils/types';
import { searchingModeState, comparisonDevicesState } from 'utils/atoms';

export default function SearchPhoneButton() {
  const [searchingMode, setSearchingMode] = useRecoilState(searchingModeState);
  const [comparisonDevices, setComparisonDevices] = useRecoilState(
    comparisonDevicesState
  );
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<SearchPhoneResult | null>(null);
  const [options, setOptions] = useState<SearchPhoneResult[]>([]);

  const timer = useRef<NodeJS.Timeout>();

  const onOpenSearching = () =>
    setSearchingMode({
      opened: true,
      mode: 'phones',
    });

  const onCloseSearching = () =>
    setSearchingMode({
      ...searchingMode,
      opened: false,
    });

  const resetInput = () => {
    setValue(null);
    setInputValue('');
  };

  const onFetchSearching = useCallback(async () => {
    if (!inputValue) {
      setOptions([]);
      return;
    }

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      const response = await axios<SearchPhoneResult[]>('/api/searching', {
        params: {
          name: inputValue,
        },
      });

      const filtered = value
        ? response.data.filter((x) => x.name !== value.name)
        : response.data;

      setOptions(value ? [value, ...filtered] : response.data);
    }, 200);
  }, [inputValue, value]);

  const selectDevice = useCallback(
    async (name: string, slot: 1 | 2) => {
      if (!name) return;

      const response = await axios<Phone>('/api/phone', {
        params: {
          name,
        },
      });
      const phone = response.data;

      if (slot === 1) setComparisonDevices([phone, comparisonDevices[1]]);
      if (slot === 2) setComparisonDevices([comparisonDevices[0], phone]);
    },
    [comparisonDevices, setComparisonDevices]
  );

  useEffect(() => {
    onFetchSearching();
  }, [onFetchSearching]);

  useEffect(() => {
    if (!value) return;
    switch (searchingMode.mode) {
      case 'phones':
        Router.push(`/phones/${encodeURIComponent(value.url)}`);
        break;
      case 'comparison_device1':
        selectDevice(value.name, 1);
        break;
      case 'comparison_device2':
        selectDevice(value.name, 2);
        break;
      default:
        break;
    }
    resetInput();
  }, [value, searchingMode.mode, selectDevice]);

  return (
    <>
      <IconButton
        aria-label="open the search"
        onClick={onOpenSearching}
        sx={{ width: 48, height: 48 }}
      >
        <SearchIcon />
      </IconButton>
      <Drawer
        anchor="top"
        open={searchingMode.opened}
        onClose={onCloseSearching}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            padding: 2,
          }}
          component="nav"
        >
          <Autocomplete
            options={options}
            inputValue={inputValue}
            onInputChange={(event, newValue) => setInputValue(newValue)}
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            filterOptions={(x) => x}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            noOptionsText="일치 결과 없음"
            autoHighlight
            autoComplete
            handleHomeEndKeys
            blurOnSelect
            renderInput={(params) => (
              <TextField {...params} label="기기 이름 입력" fullWidth />
            )}
            renderOption={(props, option) => {
              return (
                <ListItem
                  {...props}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  component="li"
                >
                  <Typography variant="body1">{option.name}</Typography>
                  <Typography variant="body2">{option.manufacturer}</Typography>
                </ListItem>
              );
            }}
            sx={{
              flexGrow: 1,
              maxWidth: 320,
            }}
          />
        </Box>
      </Drawer>
    </>
  );
}
