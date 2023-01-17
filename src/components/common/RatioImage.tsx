import Image from 'next/image';
import { useState } from 'react';

export default function RatioImage(props: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  const { src, alt, width, height } = props;
  const [relative, setRelative] = useState(0);

  if (width) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={relative}
        onLoadingComplete={(img) =>
          setRelative(width * (img.naturalHeight / img.naturalWidth))
        }
      />
    );
  }

  if (height) {
    return (
      <Image
        src={src}
        alt={alt}
        width={relative}
        height={height}
        onLoadingComplete={(img) =>
          setRelative(height * (img.naturalWidth / img.naturalHeight))
        }
      />
    );
  }

  return <div>PROPS ERROR</div>;
}
