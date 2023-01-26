import { Grid, Typography, Box, Divider, List, ListItem } from '@mui/material';
import { Phone } from 'lib/types';

export default function PhoneSpecList(props: { phone: Phone }) {
  const {
    phone: {
      name,
      url,
      manufacturer,
      released,
      price,
      display,
      coverDisplay,
      hardware,
      camera,
      design,
    },
  } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 2,
        borderRadius: 2,
        background: 'white',
      }}
    >
      <h2>상세 사양</h2>
      <Divider />

      <h3># 개요</h3>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">제품명</Typography>
        </Grid>
        <Grid item xs={8}>
          {name}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">제조사</Typography>
        </Grid>
        <Grid item xs={8}>
          {manufacturer}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">출시일자</Typography>
        </Grid>
        <Grid item xs={8}>
          {released}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">가격</Typography>
        </Grid>
        <Grid item xs={8}>
          <List disablePadding>
            {price.map((p) => (
              <ListItem key={p.variant} disablePadding>{`[${
                p.variant
              }] ${p.value.toLocaleString()} 원`}</ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <Divider />

      <h3># 디스플레이</h3>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">크기</Typography>
        </Grid>
        <Grid item xs={8}>
          {display.size} 인치
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">해상도</Typography>
        </Grid>
        <Grid item xs={8}>
          {display.resolution.pixel} 픽셀 ({display.resolution.ppi} ppi)
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">비율</Typography>
        </Grid>
        <Grid item xs={8}>
          {display.resolution.ratio}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">종류</Typography>
        </Grid>
        <Grid item xs={8}>
          {display.technology}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">최대 주사율</Typography>
        </Grid>
        <Grid item xs={8}>
          {display.refreshRate} Hz
        </Grid>
      </Grid>
      <Divider />

      {coverDisplay && (
        <>
          <h3># 커버 디스플레이</h3>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="semibold">크기</Typography>
            </Grid>
            <Grid item xs={8}>
              {coverDisplay.size} 인치
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={4}>
              <Typography variant="semibold">해상도</Typography>
            </Grid>
            <Grid item xs={8}>
              {coverDisplay.resolution.pixel} 픽셀 (
              {coverDisplay.resolution.ppi} ppi)
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={4}>
              <Typography variant="semibold">비율</Typography>
            </Grid>
            <Grid item xs={8}>
              {coverDisplay.resolution.ratio}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={4}>
              <Typography variant="semibold">종류</Typography>
            </Grid>
            <Grid item xs={8}>
              {coverDisplay.technology}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={4}>
              <Typography variant="semibold">최대 주사율</Typography>
            </Grid>
            <Grid item xs={8}>
              {display.refreshRate} Hz
            </Grid>
          </Grid>
          <Divider />
        </>
      )}

      <h3># 하드웨어</h3>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">프로세서</Typography>
        </Grid>
        <Grid item xs={8}>
          {hardware.processor}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">GPU</Typography>
        </Grid>
        <Grid item xs={8}>
          {hardware.gpu}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">RAM</Typography>
        </Grid>
        <Grid item xs={8}>
          {hardware.ram.map((r) => `${r} GB`).join('/')}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">저장용량</Typography>
        </Grid>
        <Grid item xs={8}>
          {hardware.storage
            .map((s) => (s < 1024 ? `${s} GB` : `${s / 1024} TB`))
            .join('/')}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">운영체제</Typography>
        </Grid>
        <Grid item xs={8}>
          {hardware.os}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">배터리</Typography>
        </Grid>
        <Grid item xs={8}>
          {hardware.battery} mAh
        </Grid>
      </Grid>
      <Divider />

      <h3># 카메라</h3>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">종류</Typography>
        </Grid>
        <Grid item xs={8}>
          {camera.rear}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">후면 카메라</Typography>
        </Grid>
        <Grid item xs={8}>
          {[camera.main, camera.second, camera.third, camera.fourth]
            .filter((x) => !!x)
            .map((x) => `${x} MP`)
            .join('+')}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">전면 카메라</Typography>
        </Grid>
        <Grid item xs={8}>
          {camera.front} MP
        </Grid>
      </Grid>
      <Divider />

      <h3># 규격</h3>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">크기</Typography>
        </Grid>
        <Grid item xs={8}>
          {`${design.demension[0]} × ${design.demension[1]} × ${design.demension[2]} mm`}
        </Grid>
      </Grid>
      {design.folded && (
        <>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="semibold">크기 (접었을 때)</Typography>
            </Grid>
            <Grid item xs={8}>
              {`${design.folded[0]} × ${design.folded[1]} × ${design.folded[2]} mm`}
            </Grid>
          </Grid>
        </>
      )}

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="semibold">무게</Typography>
        </Grid>
        <Grid item xs={8}>
          {design.weight} g
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
}
