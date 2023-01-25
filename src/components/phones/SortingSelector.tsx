import { Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilState } from 'recoil';
import { searchPhoneQueryState } from 'lib/atoms';

export default function SortingSelector() {
  const [searchPhoneQuery, setSearchPhoneQuery] = useRecoilState(
    searchPhoneQueryState
  );

  const onChangeSorting = (e: SelectChangeEvent<string>) => {
    setSearchPhoneQuery({
      ...searchPhoneQuery,
      sortBy: e.target.value as string,
    });
  };

  return (
    <Select
      value={searchPhoneQuery.sortBy}
      onChange={onChangeSorting}
      size="small"
      sx={{
        background: 'white',
      }}
    >
      <MenuItem value="latest" defaultChecked>
        최근 출시 순
      </MenuItem>
      <MenuItem value="old">오래된 순</MenuItem>
      <MenuItem value="high-price">가격 높은 순</MenuItem>
      <MenuItem value="low-price">가격 낮은 순</MenuItem>
    </Select>
  );
}
