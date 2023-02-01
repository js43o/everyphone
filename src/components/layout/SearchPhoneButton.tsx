import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
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
import { SearchPhoneResult } from 'utils/types';

export default function SearchPhoneButton() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<SearchPhoneResult | null>(null);
  const [options, setOptions] = useState<SearchPhoneResult[]>([]);

  const timer = useRef<NodeJS.Timeout>();

  const onClose = () => setOpen(!open);

  const onFetchSearching = useCallback(async () => {
    if (!inputValue) {
      setOptions([]);
      return;
    }

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      const response = await axios('/api/searching', {
        params: {
          input: inputValue,
        },
      });

      setOptions(response.data);
    }, 200);
  }, [inputValue]);

  useEffect(() => {
    onFetchSearching();
  }, [onFetchSearching]);

  useEffect(() => {
    if (!value) return;
    Router.push(`/phones/${encodeURIComponent(value.url)}`);
  }, [value]);

  return (
    <>
      <IconButton
        aria-label="search"
        onClick={() => setOpen(true)}
        sx={{ width: 48, height: 48 }}
      >
        <SearchIcon />
      </IconButton>
      <Drawer anchor="top" open={open} onClose={onClose}>
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
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
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
