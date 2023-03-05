import { useEffect, useState, useRef, useCallback, ChangeEvent } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import queryString from 'query-string';
import { Pagination, Box, Grid, Typography } from '@mui/material';
import PhoneCard from 'components/common/PhoneCard';
import FilterController from 'components/phones/FilterController';
import NoResult from 'components/common/NoResult';
import SortingSelector from 'components/phones/SortingSelector';
import { filterPhoneQueryState } from 'utils/atoms';
import { Phone } from 'utils/types';
import { ITEM_PER_PAGE } from 'utils/constants';
import getAllPhones from 'utils/db/getAllPhones';

export default function Phones(props: { phones: string; lastPage: number }) {
  const [phones, setPhones] = useState<Phone[]>(JSON.parse(props.phones));
  const [lastPage, setLastPage] = useState(props.lastPage);
  const [currentPage, setCurrentPage] = useState(1);
  const queryChanged = useRef(false);
  const propsAccepted = useRef(false);
  const filterPhoneQuery = useRecoilValue(filterPhoneQueryState);

  const fetchPhones = useCallback(
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

  const handleChangePage = (e: ChangeEvent<unknown>, newPage: number) => {
    if (currentPage === newPage) return;

    queryChanged.current = true;
    fetchPhones(newPage);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (!propsAccepted.current) {
      propsAccepted.current = true;
      return;
    }
    queryChanged.current = true;
    setCurrentPage(1);
    fetchPhones(1);
  }, [fetchPhones]);

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
            alignItems: 'center',
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
              phones.map((phone, index) => (
                <Grid item xs={12} md={6} xl={4} key={phone.url}>
                  <PhoneCard
                    data={phone}
                    href={`/phones/${encodeURIComponent(phone.url)}`}
                    priority={index < ITEM_PER_PAGE}
                  />
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
          onChange={handleChangePage}
          sx={{ py: 2 }}
        />
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { phones, lastPage } = await getAllPhones(ITEM_PER_PAGE);

  return {
    props: {
      phones: JSON.stringify(phones),
      lastPage,
    },
  };
};
