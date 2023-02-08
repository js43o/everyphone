import { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import { Phone } from 'utils/types';

const ImageZone = styled(Box)`
  position: relative;
  img {opacity: 0.5;
    :first-of-type {
      border: 1px solid red;
    }
    :last-of-type {
      border: 1px solid blue;
    }
  }
`;

export default function SizeComparison(props: {
  device1?: Phone;
  device2?: Phone;
}) {
  const { device1, device2 } = props;
  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(true);

  const isSm = useMediaQuery(useTheme().breakpoints.down('sm'));
  const isMd = useMediaQuery(useTheme().breakpoints.down('md'));
  const isLg = useMediaQuery(useTheme().breakpoints.down('lg'));
  const offset = isSm ? 1 : isMd ? 1.5 : isLg ? 2 : 2.5;

  const onVisibleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    slot: 1 | 2
  ) => {
    if (slot === 1) setVisible1(event.target.checked);
    if (slot === 2) setVisible2(event.target.checked);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: 2,
        borderRadius: 2,
        background: 'white',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2">크기 비교</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          lg={8}
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: { xs: 'center', lg: 'flex-start' },
            height: 'auto',
            position: 'relative',
          }}
        >
          <ImageZone>
            {device1 && visible1 && (
              <Image
                src={`/images/size/${device1.url}-front.webp`}
                alt={device1.url}
                height={device1.design.demension[0] * offset}
                width={device1.design.demension[1] * offset}
              />
            )}
            {device2 && visible2 && (
              <Image
                src={`/images/size/${device2.url}-front.webp`}
                alt={device2.url}
                height={device2.design.demension[0] * offset}
                width={device2.design.demension[1] * offset}
              />
            )}
          </ImageZone>
          <ImageZone>
            {device1 && visible1 &&  (
              <Image
                src={`/images/size/${device1.url}-side.webp`}
                alt={device1.url}
                height={device1.design.demension[0] * offset}
                width={device1.design.demension[2] * offset}
              />
            )}
            {device2 && visible2 &&  (
              <Image
                src={`/images/size/${device2.url}-side.webp`}
                alt={device2.url}
                height={device2.design.demension[0] * offset}
                width={device2.design.demension[2] * offset}
              />
            )}
          </ImageZone>
        </Grid>
        <Grid item xs={12} lg={4}>
          <FormGroup
            sx={{
              flexDirection: { xs: 'row', lg: 'column' },
              justifyContent: { xs: 'space-around', lg: 'flex-start' },
            }}
          >
            {device1 && (
              <FormControlLabel
                control={
                  <Switch
                    checked={visible1}
                    value={visible1}
                    onChange={(e) => onVisibleChange(e, 1)}
                  />
                }
                label={device1.name}
              />
            )}
            {device2 && (
              <FormControlLabel
                control={
                  <Switch
                    checked={visible2}
                    value={visible2}
                    onChange={(e) => onVisibleChange(e, 2)}
                  />
                }
                label={device2.name}
              />
            )}
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
}
