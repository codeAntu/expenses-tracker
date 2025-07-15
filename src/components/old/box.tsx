import { cn } from '@/lib/utils';

export default function Box(props: { children?: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'bg-card border-border flex flex-col rounded-lg border shadow-sm',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
