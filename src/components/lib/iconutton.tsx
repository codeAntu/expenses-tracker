import * as React from 'react';

import { cn } from '@/lib/utils';

function IconButton({
  className,
  asChild = false,
  size = 'md',
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xs';
}) {
  return (
    <button
      data-slot='icon-button'
      className={cn(
        'text-primary-foreground hover:bg-accent flex aspect-square items-center justify-center rounded-full bg-black/5 p-2 transition-colors duration-200 dark:bg-white/5 hover:dark:bg-white/7',
        size === 'xs' && 'h-8 w-8',
        size === 'sm' && 'h-9 w-9',
        size === 'md' && 'h-10 w-10',
        size === 'lg' && 'h-12 w-12',
        className,
      )}
    >
      {props.children}
      {asChild ? <span {...props} /> : null}
    </button>
  );
}

export { IconButton };
