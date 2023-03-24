import { ReactNode } from 'react';
import Link from 'next/link';
import { IconButton } from '@mui/material';

export default function LinkIconButton(props: {
  href: string;
  IconComponent: ReactNode;
}) {
  const { href, IconComponent } = props;
  return (
    <Link href={href}>
      <IconButton
        sx={{
          width: 48,
          height: 48,
        }}
      >
        {IconComponent}
      </IconButton>
    </Link>
  );
}
