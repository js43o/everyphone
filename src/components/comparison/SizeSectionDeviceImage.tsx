import Image from 'next/image';
import { Box } from '@mui/material';
import { calculateDeviceViewSize } from 'utils/methods';

const SizeSectionDeviceViewEachImage = (props: {
  type: 'front' | 'side';
  layered: boolean;
  deviceViewSize: ReturnType<typeof calculateDeviceViewSize>;
  deviceUrl?: string;
}) => {
  const { type, layered, deviceViewSize, deviceUrl } = props;

  return (
    <Box
      sx={{
        position: layered ? 'absolute' : 'relative',
        left: 0,
        bottom: 0,
        opacity: 0.5,
        ':first-of-type': {
          border: '1px solid red',
        },
        ':last-of-type': {
          border: '1px solid blue',
        },
        width:
          type === 'front' ? deviceViewSize.width : deviceViewSize.thickness,
        height: deviceViewSize.height,
        maxWidth:
          type === 'front'
            ? deviceViewSize.maxWidth
            : deviceViewSize.maxThickness,
        maxHeight: deviceViewSize.maxHeight,
      }}
    >
      {!!deviceUrl && (
        <Image
          src={`/images/size/${deviceUrl}-${type}.webp`}
          alt={deviceUrl}
          fill
          sizes={deviceViewSize.width}
        />
      )}
    </Box>
  );
};

export default function SizeSectionDeviceImage(props: {
  type: 'front' | 'side';
  layered: boolean;
  deviceViewSizes: ReturnType<typeof calculateDeviceViewSize>[];
  deviceVisible: boolean[];
  deviceUrls: (string | undefined)[];
}) {
  const { type, deviceVisible, layered, deviceViewSizes, deviceUrls } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        position: 'relative',
        width: layered ? deviceViewSizes[0].width : 'unset',
        maxWidth: layered ? deviceViewSizes[0].maxWidth : 'unset',
        pointerEvents: 'none',
      }}
    >
      {deviceVisible[0] && (
        <SizeSectionDeviceViewEachImage
          type={type}
          layered={layered}
          deviceViewSize={deviceViewSizes[0]}
          deviceUrl={deviceUrls[0]}
        />
      )}
      {deviceVisible[1] && (
        <SizeSectionDeviceViewEachImage
          type={type}
          layered={layered}
          deviceViewSize={deviceViewSizes[1]}
          deviceUrl={deviceUrls[1]}
        />
      )}
    </Box>
  );
}
