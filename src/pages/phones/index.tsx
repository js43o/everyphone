import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRecoilState } from 'recoil';
import { Pagination, Box, Grid, Select, MenuItem } from '@mui/material';
import { phonesState } from 'lib/atoms';
import { Phone } from 'lib/types';
import getPhones from 'lib/getPhones';
import PhoneCard from 'components/phones/PhoneCard';
import SearchController from 'components/phones/SearchController';

export default function Index(props: { data: string }) {
  const [sort, setSort] = useState('latest');
  const [phones, setPhones] = useRecoilState(phonesState);

  useEffect(() => {
    const ssrPhones: Phone[] = JSON.parse(props.data);
    setPhones(ssrPhones);
  }, [props.data, setPhones]);

  return (
    <>
      <Head>
        <title>Everyphone | Phones</title>
        <meta name="description" content="스마트폰 목록" />
      </Head>
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
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} lg={4} xl={3}>
            <SearchController />
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
    </>
  );
}

export async function getServerSideProps() {
  const response: Phone[] = await getPhones();
  return {
    props: { data: JSON.stringify(response) },
  };
}
