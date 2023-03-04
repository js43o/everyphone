import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import LoadingIndicator from 'components/common/LoadingIndicator';
import PhoneCard from 'components/common/PhoneCard';
import NoResult from 'components/common/NoResult';
import { Phone } from 'utils/types';
import { ITEM_PER_PAGE } from 'utils/constants';
import { getFavoriteList, toggleFavorite } from 'utils/methods';

export default function Favorite() {
  const [phones, setPhones] = useState<Phone[] | null>(null);

  const deleteFavorite = (name: string) => {
    if (!phones) return;
    toggleFavorite(name);
    setPhones(phones.filter((other) => other.name !== name));
  };

  useEffect(() => {
    const favorite = getFavoriteList();
    const fetchFavorites = async () => {
      try {
        const response = await axios<Phone[]>('/api/favorite', {
          params: { names: favorite },
        });
        setPhones(response.data);
      } catch (e) {
        throw e;
      }
    };
    fetchFavorites();
  }, []);

  return (
    <>
      <Head>
        <title>Everyphone | Favorite</title>
        <meta name="description" content="북마크한 기기 목록" />
      </Head>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          px: { xs: 2, lg: 0 },
        }}
      >
        <Typography variant="h1">내 북마크</Typography>
        <Grid container spacing={1}>
          {phones === null ? (
            <LoadingIndicator />
          ) : phones.length > 0 ? (
            phones.map((phone, index) => (
              <Grid item key={phone.url} xs={12} md={6} lg={3}>
                <PhoneCard
                  data={phone}
                  href={`/phones/${encodeURIComponent(phone.url)}`}
                  priority={index < ITEM_PER_PAGE}
                  handleDelete={() => deleteFavorite(phone.name)}
                />
              </Grid>
            ))
          ) : (
            <NoResult />
          )}
        </Grid>
      </Box>
    </>
  );
}
