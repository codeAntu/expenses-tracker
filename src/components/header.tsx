import { Bell, Wallet } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

export default function Header() {
  return (
    <div className='bg-background sticky top-0 z-10 flex items-center justify-between border-b px-5 pt-3.5 pb-2'>
      <div className='text-secondary-foreground/90 pb-0.5 text-lg font-semibold flex items-center gap-2'>
        <Wallet size={25} className='inline-block' />
        Expense Tracker
      </div>
      <div className='flex items-center gap-3'>
        <ModeToggle />
        <div className='bg-secondary/70 hover:bg-secondary/60 border-primary/5 text-secondary-foreground cursor-pointer rounded-full border p-2.5 transition duration-250'>
          <Bell size={17} />
        </div>
        <div className='bg-secondary/70 hover:bg-secondary/60 text-secondary-foreground border-primary/5 flex cursor-pointer items-center justify-center rounded-full border p-0.5 transition duration-250'>
          <div className='pr-2 pb-0.5 pl-3 text-xs font-medium'>Ananta Karmakar</div>
          <div className=''>
            <img src='https://github.com/shadcn.png' className='aspect-square w-8 rounded-full border' />
            {/* <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' className='' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className='border-foreground/5 bg-accent flex items-center justify-between rounded-xl border p-1 sm:p-1.5'> */
}
