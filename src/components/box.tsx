import { cn } from '@/lib/utils';

export default function Box(props: { children?: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'bg-accent border-foreground/5 inline-flex flex-col items-center justify-center overflow-hidden rounded-xl border p-5',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
