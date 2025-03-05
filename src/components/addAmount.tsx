import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from '@/components/motion-primitives/morphing-dialog';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CalendarIcon, Plus, XIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import React, { useState } from 'react';

const amounts = [4846, 100, 200, 500, 1000, 234];

export default function AddAmount() {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  return (
    <div>
      <MorphingDialog
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
      >
        <MorphingDialogTrigger>
          <div className='rounded-full bg-black p-2 text-white dark:bg-white dark:text-black'>
            <Plus />
          </div>
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <MorphingDialogContent className='relative'>
            <div className='grid gap-10 rounded-2xl border bg-white px-7 py-10 sm:px-10 sm:py-10 dark:bg-black'>
              <div className='text-center text-lg font-semibold sm:text-2xl'>Add to Amount to your account</div>

              <div className='grid gap-5'>
                <div className='grid grid-cols-3 gap-2'>
                  {amounts.map((amu) => (
                    <label
                      key={amu}
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border p-2 text-sm transition-colors sm:text-base ${
                        amu === amount
                          ? 'border-black/20 dark:border-white/20'
                          : 'bg-black/10 hover:bg-black/5 dark:bg-white/10 dark:hover:bg-white/5'
                      }`}
                    >
                      <input type='radio' name='amount' className='hidden' onClick={() => setAmount(amu)} />
                      <div>{amu}</div>
                    </label>
                  ))}
                </div>
                <div className='grid gap-3'>
                  <input
                    type='text'
                    className='rounded-lg border px-3 py-2 outline-none'
                    placeholder='Enter your amount'
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                  <textarea
                    className='h-20 rounded-lg border px-5 py-2 text-sm outline-none'
                    placeholder='Enter your message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className='flex items-center justify-between gap-2 text-sm font-medium text-black/60 dark:text-white/60'>
                    <ComboboxDemo />
                    <DatePickerDemo />
                  </div>
                </div>
                <Button>Add amount</Button>
              </div>
            </div>
            <MorphingDialogClose className='top-6 right-6 h-fit w-fit rounded-full bg-white p-1'>
              <XIcon className='h-5 w-5 text-zinc-500' />
            </MorphingDialogClose>
          </MorphingDialogContent>
        </MorphingDialogContainer>
      </MorphingDialog>
    </div>
  );
}

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon />
            {date ? format(date, 'PPP') : 'Select date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
}

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
          {value ? frameworks.find((framework) => framework.value === value)?.label : 'Select framework...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search framework...' />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === framework.value ? 'opacity-100' : 'opacity-0')} />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
