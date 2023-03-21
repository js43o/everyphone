import { ReactNode } from 'react';
import Link from 'next/link';
import { IconButton } from '@mui/material';

export default function LinkIconButton(props: {
  href: string;
  iconComponent: ReactNode;
}) {
  const { href, iconComponent } = props;
  return (
    <Link href={href}>
      <IconButton
        sx={{
          width: 48,
          height: 48,
        }}
      >
        {iconComponent}
      </IconButton>
    </Link>
  );
}
