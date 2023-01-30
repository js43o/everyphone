import { Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilState } from 'recoil';
import { filterPhoneQueryState } from 'utils/atoms';

export default function SortingSelector() {
  const [filterPhoneQuery, setFilterPhoneQuery] = useRecoilState(
    filterPhoneQueryState
  );

  const onChangeSorting = (e: SelectChangeEvent<string>) => {
    setFilterPhoneQuery({
      ...filterPhoneQuery,
      sortBy: e.target.value as string,
    });
  };

  return (
    <Select
      value={filterPhoneQuery.sortBy}
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
