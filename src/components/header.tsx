import { Bell, Search as SearchIcon, Wallet } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

export default function Header() {
  return (
    <div className='bg-background text-secondary-foreground sticky top-0 z-10 flex items-center justify-between border-b p-2.5 pt-2 pb-2 sm:pt-3 md:px-5'>
      <div className='text-secondary-foreground/90 flex items-center gap-2 pb-0.5 text-lg font-semibold'>
        <Wallet size={25} className='inline-block' />
        <span className='hidden sm:inline-block'>Expense Tracker</span>
      </div>
      <Search />
      <div className='flex items-center gap-1.5 lg:gap-3'>
        <div className='bg-secondary/70 hover:bg-secondary/60 border-primary/5 text-secondary-foreground cursor-pointer rounded-full border p-1.5 transition duration-250 md:hidden md:p-2.5'>
          <SearchIcon className='h-5 w-5' />
        </div>
        <ModeToggle />
        <div className='bg-secondary/70 hover:bg-secondary/60 border-primary/5 text-secondary-foreground cursor-pointer rounded-full border p-1.5 transition duration-250 md:p-2'>
          <Bell className='h-5 w-5' />
        </div>
        <Profile />
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className='bg-secondary/70 hover:bg-secondary/60 text-secondary-foreground border-primary/5 flex cursor-pointer items-center justify-center rounded-full border p-0.5 transition duration-250'>
      <div className='hidden pr-2 pb-0.5 pl-3 text-xs font-medium lg:block'>Ananta Karmakar</div>
      <div className='w-7 sm:w-8'>
        <img src='https://github.com/shadcn.png' className='aspect-square rounded-full border' />
        {/* <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' className='' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
      </div>
    </div>
  );
}

function Search() {
  return (
    <>
      <div className='hidden w-[30%] max-w-96 items-center justify-between gap-2 rounded-3xl border px-3 py-1.5 pr-3 md:flex'>
        <input
          type='text'
          placeholder='Search...'
          className='w-full border-none text-base font-medium outline-none'
          id='search'
          name='search'
        />
        <label htmlFor='search' className='text-secondary-foreground cursor-pointer'>
          <SearchIcon size={20} className='' />
        </label>
      </div>
    </>
  );
}
