import { Typography, Box, Divider, List, ListItem } from '@mui/material';
import { Phone } from 'utils/types';
import SpecSheetItem from './SpecSheetItem';

export default function SpecSheet(props: { phone: Phone }) {
  const {
    phone: {
      name,
      korName,
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
        gap: 1,
        padding: 2,
        borderRadius: 2,
        bgcolor: 'bluegrey.lighter',
      }}
    >
      <Typography variant="h2">상세 사양</Typography>
      <Divider />
      <List
        sx={{
          '& > li': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 1,
            padding: '1rem 0',
          },
        }}
        disablePadding
      >
        <ListItem>
          <Typography variant="h3"># 기본 정보</Typography>
          <SpecSheetItem title="제품명" content={`${name} / ${korName}`} />
          <SpecSheetItem title="제조사" content={manufacturer} />
          <SpecSheetItem title="출시일자" content={released} />
          <SpecSheetItem
            title="가격"
            content={price.map(
              (item) => `[${item.variant}] ${item.value.toLocaleString()} 원`
            )}
          />
        </ListItem>
        <Divider />

        <ListItem>
          <Typography variant="h3"># 디스플레이</Typography>
          <SpecSheetItem title="크기" content={`${display.size} 인치`} />
          <SpecSheetItem
            title="해상도"
            content={`${display.resolution.pixel} 픽셀 (${display.resolution.ppi} ppi)`}
          />
          <SpecSheetItem title="비율" content={display.resolution.ratio} />
          <SpecSheetItem title="종류" content={display.technology} />
          <SpecSheetItem
            title="최대 주사율"
            content={`${display.refreshRate} Hz`}
          />
        </ListItem>
        <Divider />

        {coverDisplay && (
          <>
            <ListItem>
              <Typography variant="h3"># 커버 디스플레이</Typography>
              <SpecSheetItem
                title="크기"
                content={`${coverDisplay.size} 인치`}
              />
              <SpecSheetItem
                title="해상도"
                content={`${coverDisplay.resolution.pixel} 픽셀 (${coverDisplay.resolution.ppi} ppi)`}
              />
              <SpecSheetItem
                title="비율"
                content={coverDisplay.resolution.ratio}
              />
              <SpecSheetItem title="종류" content={coverDisplay.technology} />
              <SpecSheetItem
                title="최대 주사율"
                content={`${coverDisplay.refreshRate} Hz`}
              />
            </ListItem>
            <Divider />
          </>
        )}

        <ListItem>
          <Typography variant="h3"># 하드웨어</Typography>
          <SpecSheetItem title="프로세서" content={hardware.processor} />
          <SpecSheetItem title="GPU" content={hardware.gpu} />
          <SpecSheetItem
            title="RAM"
            content={hardware.ram.map((r) => `${r} GB`).join('/')}
          />

          <SpecSheetItem
            title="저장용량"
            content={hardware.storage
              .map((s) => (s < 1024 ? `${s} GB` : `${s / 1024} TB`))
              .join('/')}
          />
          <SpecSheetItem title="운영체제" content={hardware.os} />
          <SpecSheetItem title="배터리" content={`${hardware.battery} mAh`} />
        </ListItem>
        <Divider />
        <ListItem>
          <Typography variant="h3"># 카메라</Typography>
          <SpecSheetItem title="종류" content={camera.rear} />
          <SpecSheetItem
            title="후면 카메라"
            content={[camera.main, camera.second, camera.third, camera.fourth]
              .filter((x) => !!x)
              .map((x) => `${x} MP`)
              .join('+')}
          />
          <SpecSheetItem
            title="전면 카메라"
            content={`
          ${camera.front} MP`}
          />
        </ListItem>
        <Divider />

        <ListItem>
          <Typography variant="h3"># 규격</Typography>
          <SpecSheetItem
            title="크기"
            content={`${design.demension[0]} × ${design.demension[1]} × ${design.demension[2]} mm`}
          />
          {design.folded && (
            <SpecSheetItem
              title="크기 (접었을 때)"
              content={`${design.folded[0]} × ${design.folded[1]} × ${design.folded[2]} mm`}
            />
          )}
          <SpecSheetItem title="무게" content={`${design.weight} g`} />
        </ListItem>
      </List>
    </Box>
  );
}
