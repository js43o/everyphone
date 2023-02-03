import { Box, Divider, Typography, Grid, Chip } from '@mui/material';
import { Phone } from 'utils/types';
import SpecComparisonItem from './SpecComparisonItem';

export default function SpecComparisonList(props: {
  device1?: Phone;
  device2?: Phone;
}) {
  const { device1, device2 } = props;

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
        }}
      >
        <Typography variant="h2">사양 비교</Typography>
      </Box>

      <Divider>
        <Chip label="기본 정보" variant="filled" />
      </Divider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1,
        }}
      >
        <SpecComparisonItem
          title="이름"
          content1={`${device1?.name} / ${device1?.korName}`}
          content2={`${device2?.name} / ${device2?.korName}`}
        />
        <SpecComparisonItem
          title="제조사"
          content1={device1?.manufacturer}
          content2={device2?.manufacturer}
        />
        <SpecComparisonItem
          title="출시일자"
          content1={device1?.released}
          content2={device2?.released}
        />
        <SpecComparisonItem
          title="가격"
          content1={device1?.price.map(
            (item) => `[${item.variant}] ${item.value.toLocaleString()} 원`
          )}
          content2={device2?.price.map(
            (item) => `[${item.variant}] ${item.value.toLocaleString()} 원`
          )}
        />
      </Box>

      <Divider>
        <Chip label="디스플레이" />
      </Divider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <SpecComparisonItem
          title="크기"
          content1={`${device1?.display.size} 인치`}
          content2={`${device2?.display.size} 인치`}
        />
        <SpecComparisonItem
          title="해상도"
          content1={`${device1?.display.resolution.pixel} 픽셀 (${device1?.display.resolution.ppi} ppi)`}
          content2={`${device2?.display.resolution.pixel} 픽셀 (${device2?.display.resolution.ppi} ppi)`}
        />
        <SpecComparisonItem
          title="비율"
          content1={device1?.display.resolution.ratio}
          content2={device2?.display.resolution.ratio}
        />
        <SpecComparisonItem
          title="종류"
          content1={device1?.display.technology}
          content2={device2?.display.technology}
        />
        <SpecComparisonItem
          title="최대 주사율"
          content1={`${device1?.display.refreshRate} Hz`}
          content2={`${device2?.display.refreshRate} Hz`}
        />
      </Box>

      {device1?.coverDisplay && device2?.coverDisplay && (
        <>
          <Divider>
            <Chip label="커버 디스플레이" variant="filled" />
          </Divider>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            <SpecComparisonItem
              title="크기"
              content1={`${device1?.coverDisplay.size} 인치`}
              content2={`${device2?.coverDisplay.size} 인치`}
            />
            <SpecComparisonItem
              title="해상도"
              content1={`${device1?.coverDisplay.resolution.pixel} 픽셀 (${device1?.coverDisplay.resolution.ppi} ppi)`}
              content2={`${device2?.coverDisplay.resolution.pixel} 픽셀 (${device2?.coverDisplay.resolution.ppi} ppi)`}
            />
            <SpecComparisonItem
              title="비율"
              content1={device1?.coverDisplay.resolution.ratio}
              content2={device2?.coverDisplay.resolution.ratio}
            />
            <SpecComparisonItem
              title="종류"
              content1={device1?.coverDisplay.technology}
              content2={device2?.coverDisplay.technology}
            />
            <SpecComparisonItem
              title="최대 주사율"
              content1={`${device1?.coverDisplay.refreshRate} Hz`}
              content2={`${device2?.coverDisplay.refreshRate} Hz`}
            />
          </Box>
        </>
      )}

      <Divider>
        <Chip label="하드웨어" variant="filled" />
      </Divider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1,
        }}
      >
        <SpecComparisonItem
          title="프로세서"
          content1={device1?.hardware.processor}
          content2={device2?.hardware.processor}
        />
        <SpecComparisonItem
          title="GPU"
          content1={device1?.hardware.gpu}
          content2={device2?.hardware.gpu}
        />
        <SpecComparisonItem
          title="RAM"
          content1={`${device1?.hardware.ram} GB`}
          content2={`${device2?.hardware.ram} GB`}
        />
        <SpecComparisonItem
          title="저장용량"
          content1={device1?.hardware.storage
            .map((s) => (s < 1024 ? `${s} GB` : `${s / 1024} TB`))
            .join('/')}
          content2={device2?.hardware.storage
            .map((s) => (s < 1024 ? `${s} GB` : `${s / 1024} TB`))
            .join('/')}
        />
        <SpecComparisonItem
          title="운영체제"
          content1={device1?.hardware.os}
          content2={device2?.hardware.os}
        />
        <SpecComparisonItem
          title="배터리"
          content1={`${device1?.hardware.battery} mAh`}
          content2={`${device2?.hardware.battery} mAh`}
        />
      </Box>

      <Divider>
        <Chip label="카메라" variant="filled" />
      </Divider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1,
        }}
      >
        <SpecComparisonItem
          title="종류"
          content1={device1?.camera.rear}
          content2={device2?.camera.rear}
        />
        <SpecComparisonItem
          title="후면 카메라"
          content1={[
            device1?.camera.main,
            device1?.camera.second,
            device1?.camera.third,
            device1?.camera.fourth,
          ]
            .filter((x) => !!x)
            .map((x) => `${x} MP`)
            .join('+')}
          content2={[
            device2?.camera.main,
            device2?.camera.second,
            device2?.camera.third,
            device2?.camera.fourth,
          ]
            .filter((x) => !!x)
            .map((x) => `${x} MP`)
            .join('+')}
        />
        <SpecComparisonItem
          title="전면 카메라"
          content1={`
          ${device1?.camera.front} MP`}
          content2={`
        ${device2?.camera.front} MP`}
        />
      </Box>

      <Divider>
        <Chip label="규격" variant="filled" />
      </Divider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1,
        }}
      >
        <SpecComparisonItem
          title="크기"
          content1={`${device1?.design.demension[0]} × ${device1?.design.demension[1]} × ${device1?.design.demension[2]} mm`}
          content2={`${device2?.design.demension[0]} × ${device2?.design.demension[1]} × ${device2?.design.demension[2]} mm`}
        />
        {device1?.design.folded && device2?.design.folded && (
          <>
            <SpecComparisonItem
              title="크기 (접었을 때)"
              content1={`${device1?.design.folded[0]} × ${device1?.design.folded[1]} × ${device1?.design.folded[2]} mm`}
              content2={`${device2?.design.folded[0]} × ${device2?.design.folded[1]} × ${device2?.design.folded[2]} mm`}
            />
          </>
        )}
        <SpecComparisonItem
          title="무게"
          content1={`${device1?.design.weight} g`}
          content2={`${device2?.design.weight} g`}
        />
      </Box>
    </Box>
  );
}
