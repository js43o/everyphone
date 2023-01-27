import { Grid, Typography, Box, Divider, List, ListItem } from '@mui/material';
import { Phone } from 'lib/types';
import PhoneSpecItem from './PhoneSpecItem';

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
        '& h3': {
          marginTop: 0,
        },
      }}
      component="ul"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h2>상세 사양</h2>
      </Box>
      <Divider
        sx={{
          background: '#555555',
          height: 1,
        }}
      />

      <h3># 개요</h3>
      <PhoneSpecItem title="제품명" content={name} />
      <PhoneSpecItem title="제조사" content={manufacturer} />
      <PhoneSpecItem title="출시일자" content={released} />
      <PhoneSpecItem
        title="가격"
        content={price.map(
          (item) => `[${item.variant}] ${item.value.toLocaleString()} 원`
        )}
      />
      <Divider />

      <h3># 디스플레이</h3>
      <PhoneSpecItem title="크기" content={`${display.size} 인치`} />
      <PhoneSpecItem
        title="해상도"
        content={`${display.resolution.pixel} 픽셀 (${display.resolution.ppi} ppi)`}
      />
      <PhoneSpecItem title="비율" content={display.resolution.ratio} />
      <PhoneSpecItem title="종류" content={display.technology} />
      <PhoneSpecItem
        title="최대 주사율"
        content={`${display.refreshRate} Hz`}
      />
      <Divider />

      {coverDisplay && (
        <>
          <h3># 커버 디스플레이</h3>
          <PhoneSpecItem title="크기" content={`${coverDisplay.size} 인치`} />
          <PhoneSpecItem
            title="해상도"
            content={`${coverDisplay.resolution.pixel} 픽셀 (${coverDisplay.resolution.ppi} ppi)`}
          />
          <PhoneSpecItem title="비율" content={coverDisplay.resolution.ratio} />
          <PhoneSpecItem title="종류" content={coverDisplay.technology} />
          <PhoneSpecItem
            title="최대 주사율"
            content={`${coverDisplay.refreshRate} Hz`}
          />
          <Divider />
        </>
      )}

      <h3># 하드웨어</h3>
      <PhoneSpecItem title="프로세서" content={hardware.processor} />
      <PhoneSpecItem title="GPU" content={hardware.gpu} />
      <PhoneSpecItem
        title="RAM"
        content={hardware.ram.map((r) => `${r} GB`).join('/')}
      />

      <PhoneSpecItem
        title="저장용량"
        content={hardware.storage
          .map((s) => (s < 1024 ? `${s} GB` : `${s / 1024} TB`))
          .join('/')}
      />
      <PhoneSpecItem title="운영체제" content={hardware.os} />
      <PhoneSpecItem title="배터리" content={`${hardware.battery} mAh`} />
      <Divider />

      <h3># 카메라</h3>
      <PhoneSpecItem title="종류" content={camera.rear} />
      <PhoneSpecItem
        title="후면 카메라"
        content={[camera.main, camera.second, camera.third, camera.fourth]
          .filter((x) => !!x)
          .map((x) => `${x} MP`)
          .join('+')}
      />
      <PhoneSpecItem
        title="전면 카메라"
        content={`
          ${camera.front} MP`}
      />
      <Divider />

      <h3># 규격</h3>
      <PhoneSpecItem
        title="크기"
        content={`${design.demension[0]} × ${design.demension[1]} × ${design.demension[2]} mm`}
      />
      {design.folded && (
        <PhoneSpecItem
          title="크기 (접었을 때)"
          content={`${design.demension[0]} × ${design.demension[1]} × ${design.demension[2]} mm`}
        />
      )}
      <PhoneSpecItem title="무게" content={`${design.weight} g`} />
    </Box>
  );
}
