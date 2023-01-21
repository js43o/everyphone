import { useState } from 'react';
import {
  Pagination,
  Box,
  Grid,
  Select,
  MenuItem,
  Collapse,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Phone } from 'lib/types';
import PhoneCard from 'components/phones/PhoneCard';
import SearchController from 'components/phones/SearchController';
import getPhones from 'lib/getPhones';

export default function Index(props: { data: string }) {
  const phones: Phone[] = JSON.parse(props.data);
  const [sort, setSort] = useState('latest');
  const [openController, setOpenController] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        maxWidth: 1024,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          gap: '0.5rem',
        }}
      >
        <h1>기기 목록</h1>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value as string)}
          size="small"
          sx={{
            background: 'white',
          }}
        >
          <MenuItem value="latest" defaultChecked>
            최근 출시 순
          </MenuItem>
          <MenuItem value="oldest">오래된 순</MenuItem>
          <MenuItem value="expensive">가격 높은 순</MenuItem>
          <MenuItem value="cheapest">가격 낮은 순</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4} xl={3}>
          <IconButton
            onClick={() => setOpenController(!openController)}
            sx={{
              display: {
                xs: 'flex',
                lg: 'none',
              },
            }}
          >
            <Typography>필터</Typography>
            {openController ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <Collapse
            in={!isMobile || openController}
            timeout="auto"
            unmountOnExit
          >
            <SearchController />
          </Collapse>
        </Grid>
        <Grid item container xs={12} lg={8} xl={9} spacing={1}>
          {phones.map((phone) => (
            <Grid item xs={12} md={6} xl={4} key={phone.url}>
              <PhoneCard data={phone} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Pagination count={1} />
    </Box>
  );
}

export async function getServerSideProps() {
  const response: Phone[] = await getPhones();
  return {
    props: { data: JSON.stringify(response) },
  };
}
