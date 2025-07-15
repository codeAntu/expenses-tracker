import { GalleryVerticalEnd } from 'lucide-react';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='grid min-h-svh bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 lg:grid-cols-2 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='flex flex-col gap-4 rounded-2xl bg-white/80 p-6 shadow-xl md:m-4 md:p-10 lg:m-10 dark:bg-gray-900/80'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <a href='#' className='text-primary flex items-center gap-2 text-lg font-bold tracking-tight drop-shadow-md'>
            <div className='from-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr to-pink-500 shadow-lg'>
              <GalleryVerticalEnd className='size-5' />
            </div>
            <span className='from-primary bg-gradient-to-r to-pink-500 bg-clip-text text-transparent'>Acme Inc.</span>
          </a>
        </div>
        <div className='flex w-full flex-1 items-center justify-center'>
          <div className='w-full max-w-sm rounded-xl'>{children}</div>
        </div>
      </div>
      <div className='bg-muted relative hidden overflow-hidden rounded-l-3xl lg:block'>
        <img
          src='/placeholder.svg'
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
        <div className='from-primary/40 absolute inset-0 bg-gradient-to-tr to-pink-500/30 dark:from-gray-900/60 dark:to-gray-800/60'></div>
      </div>
    </div>
  );
}
