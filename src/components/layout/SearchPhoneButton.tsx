import { useEffect, useState, useCallback } from 'react';
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

  const onCloseDrawer = () => setOpen(!open);

  const onFetchSearching = useCallback(async () => {
    if (!inputValue) {
      setOptions([]);
      return;
    }

    const response = await axios('/api/phone', {
      params: {
        input: inputValue,
      },
    });
    setOptions(response.data);
  }, [inputValue]);

  useEffect(() => {
    onFetchSearching();
  }, [inputValue, onFetchSearching]);

  return (
    <>
      <IconButton
        aria-label="search"
        onClick={() => setOpen(true)}
        sx={{ width: 48, height: 48 }}
      >
        <SearchIcon />
      </IconButton>
      <Drawer anchor="top" open={open} onClose={onCloseDrawer}>
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
          {value ? (
            <IconButton href={`/phones/${encodeURIComponent(value.url)}`}>
              <SearchIcon color="primary" />
            </IconButton>
          ) : (
            <IconButton disabled>
              <SearchIcon color="disabled" />
            </IconButton>
          )}
        </Box>
      </Drawer>
    </>
  );
}
