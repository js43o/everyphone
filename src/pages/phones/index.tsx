import { useEffect, useState, useRef, useCallback, ChangeEvent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import queryString from 'query-string';
import { Pagination, Box, Grid } from '@mui/material';
import { phonesState, searchPhoneQueryState } from 'lib/atoms';
import { Phone } from 'lib/types';
import getPhones from 'lib/getPhones';
import PhoneCard from 'components/phones/PhoneCard';
import SearchController from 'components/phones/SearchController';
import NoResult from 'components/common/NoResult';
import SortingSelector from 'components/phones/SortingSelector';

export default function Index(props: { phones: string; lastPage: string }) {
  const [phones, setPhones] = useRecoilState(phonesState);
  const searchPhoneQuery = useRecoilValue(searchPhoneQueryState);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
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

  const onChangePage = (e: ChangeEvent<unknown>, newPage: number) => {
    if (currentPage === newPage) return;

    queryChanged.current = true;
    onFetchPhones(newPage);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const ssrPhones: Phone[] = JSON.parse(props.phones);
    setPhones(ssrPhones);
    setLastPage(Number(props.lastPage));
  }, [props, setPhones]);

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
            gap: 1,
          }}
        >
          <h1>기기 목록</h1>
          <SortingSelector />
        </Box>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} lg={4} xl={3}>
            <SearchController />
          </Grid>
          {phones.length > 0 ? (
            <Grid item container xs={12} lg={8} xl={9} spacing={1}>
              {phones.map((phone) => (
                <Grid item xs={12} md={6} xl={4} key={phone.url}>
                  <Link href={`/phones/${encodeURIComponent(phone.url)}`}>
                    <PhoneCard data={phone} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid
              item
              container
              xs={12}
              lg={8}
              xl={9}
              spacing={1}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <NoResult />
            </Grid>
          )}
        </Grid>
        <Pagination
          count={lastPage}
          page={currentPage}
          onChange={onChangePage}
        />
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const { phones, lastPage } = await getPhones({});
  return {
    props: {
      phones: JSON.stringify(phones),
      lastPage,
    },
  };
}
