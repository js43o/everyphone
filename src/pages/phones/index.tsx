import { useEffect, useState, useRef, useCallback } from 'react';
import Head from 'next/head';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import queryString from 'query-string';
import { Pagination, Box, Grid, Select, MenuItem } from '@mui/material';
import { phonesState, searchPhoneQueryState } from 'lib/atoms';
import { Phone } from 'lib/types';
import getPhones from 'lib/getPhones';
import PhoneCard from 'components/phones/PhoneCard';
import SearchController from 'components/phones/SearchController';

export default function Index(props: { data: string; lastPage: string }) {
  const [phones, setPhones] = useRecoilState(phonesState);
  const searchPhoneQuery = useRecoilValue(searchPhoneQueryState);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('latest');
  const queryChanged = useRef(false);

  const onFetchPhones = useCallback(
    async (page: number) => {
      if (!queryChanged.current) return;

      const response = await axios.get(
        `/api/phones?${queryString.stringify(searchPhoneQuery)}&page=${page}`
      );
      setPhones(response.data.phones);
      setLastPage(response.data.lastPage);

      queryChanged.current = false;
    },
    [searchPhoneQuery, setPhones]
  );

  useEffect(() => {
    const ssrPhones: Phone[] = JSON.parse(props.data);
    setPhones(ssrPhones);
    setLastPage(Number(props.lastPage));
  }, [props, setPhones, setLastPage]);

  useEffect(() => {
    queryChanged.current = true;
    setCurrentPage(1);
    onFetchPhones(1);
  }, [onFetchPhones]);

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
            <SearchController onFetchPhones={onFetchPhones} />
          </Grid>
          <Grid item container xs={12} lg={8} xl={9} spacing={1}>
            {phones.map((phone) => (
              <Grid item xs={12} md={6} xl={4} key={phone.url}>
                <PhoneCard data={phone} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Pagination
          count={lastPage}
          page={currentPage}
          onChange={(_, newPage) => {
            if (currentPage === newPage) return;
            queryChanged.current = true;
            onFetchPhones(newPage);
            setCurrentPage(newPage);
          }}
        />
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const { phones, lastPage } = await getPhones({});
  return {
    props: {
      data: JSON.stringify(phones),
      lastPage,
    },
  };
}
