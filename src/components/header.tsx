import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from './mode-toggle';

export default function Header() {
  return (
    <div className='flex items-center justify-between rounded-xl border border-foreground/10 bg-accent p-1 sm:p-1.5'>
      {/* <SidebarTrigger size='icon' className='text-3xl' /> */}
      <div className='flex items-center gap-3'> 
        <ModeToggle /> 
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' className='h-8 w-8 rounded-full' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
