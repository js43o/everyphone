import { useEffect, useState, useRef, useCallback, ChangeEvent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import queryString from 'query-string';
import { Pagination, Box, Grid, Typography } from '@mui/material';
import { phonesState, filterPhoneQueryState } from 'utils/atoms';
import PhoneCard from 'components/phones/PhoneCard';
import FilterController from 'components/phones/FilterController';
import NoResult from 'components/common/NoResult';
import SortingSelector from 'components/phones/SortingSelector';

export default function Index() {
  const [phones, setPhones] = useRecoilState(phonesState);
  const filterPhoneQuery = useRecoilValue(filterPhoneQueryState);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const queryChanged = useRef(false);

  const onFetchPhones = useCallback(
    async (page: number) => {
      if (!queryChanged.current) return;

      const response = await axios.get(
        `/api/phones?${queryString.stringify(filterPhoneQuery)}&page=${page}`
      );
      setPhones(response.data.phones);
      setLastPage(response.data.lastPage);

      queryChanged.current = false;
    },
    [filterPhoneQuery, setPhones]
  );

  const onChangePage = (e: ChangeEvent<unknown>, newPage: number) => {
    if (currentPage === newPage) return;

    queryChanged.current = true;
    onFetchPhones(newPage);
    setCurrentPage(newPage);
  };

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
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
            px: { xs: 2, lg: 0 },
          }}
        >
          <Typography variant="h1">기기 목록</Typography>
          <SortingSelector />
        </Box>
        <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Grid item xs={12} lg={4} xl={3}>
            <FilterController />
          </Grid>
          <Grid
            item
            container
            xs={12}
            lg={8}
            xl={9}
            spacing={1}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            {phones.length > 0 ? (
              phones.map((phone) => (
                <Grid item xs={12} md={6} xl={4} key={phone.url}>
                  <Link href={`/phones/${encodeURIComponent(phone.url)}`}>
                    <PhoneCard data={phone} priority />
                  </Link>
                </Grid>
              ))
            ) : (
              <NoResult />
            )}
          </Grid>
        </Grid>
        <Pagination
          count={lastPage}
          page={currentPage}
          onChange={onChangePage}
          sx={{ py: 2 }}
        />
      </Box>
    </>
  );
}
