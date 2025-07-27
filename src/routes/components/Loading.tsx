import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

interface LoadingProps {
  className?: string;
  iconClassName?: string;
  variant?: 'default' | 'primary' | 'secondary';
}

const Loading: React.FC<LoadingProps> = ({ className, iconClassName, variant = 'default' }) => {
  let iconColorClass = 'text-default-foreground';
  if (variant === 'primary') iconColorClass = 'text-primary';
  else if (variant === 'secondary') iconColorClass = 'text-muted-foreground';

  return (
    <div className={cn('flex h-full w-full items-center justify-center', className)}>
      <LoaderCircle className={cn(iconColorClass, 'animate-spin', iconClassName)} />
    </div>
  );
};

export default Loading;
