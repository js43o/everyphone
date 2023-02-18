import Image, { ImageProps } from 'next/image';
import { Box } from '@mui/material';

export default function RatioImage(props: Partial<ImageProps>) {
  const { src, alt, width, height, priority, sizes } = props;

  if (!src || !alt) return <></>;

  return (
    <Box
      sx={{
        display: 'flex',
        height: height || width || '100%',
        width: width || height || '100%',
        position: 'relative',
        '& > img': { objectFit: 'contain' },
      }}
    >
      <Image
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        priority={!!priority}
        fill
        sizes={sizes}
      />
    </Box>
  );
}
