import { ChevronDown, ChevronUp } from 'lucide-react';
import Box from './box';
import { transactions } from './transactions';

export default function Transaction({ transaction }: { transaction: typeof transactions[0] }) {
  return (
    <Box className='w-full flex-col items-baseline justify-baseline gap-1.5 px-3 py-3'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2.5'>
          <div className='flex items-center justify-between'>
            <div className='text-accent-foreground/90 text-3xl font-bold'>
              <span>&#8377;</span>
              {' ' + transaction.amount.toLocaleString('en-IN')}
            </div>
            <div className='rounded-full bg-green-500/10 p-0.5'>
              {transaction.type === 'income' ? (
                <ChevronUp size={32} strokeWidth={3.5} className='font-extrabold text-green-500' />
              ) : (
                <ChevronDown size={32} strokeWidth={3.5} className='font-extrabold text-red-500' />
              )}
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              {transaction.tags.map((tag) => (
                <div
                  key={tag.name}
                  className={`text-accent-foreground/80 rounded-sm border border-indigo-500/30 bg-indigo-500/15 px-1.5 py-0.5 text-xs font-semibold`}
                >
                  {tag.name}
                </div>
              ))}
            </div>
            <div>
              {/* date  */}
              <div className='text-accent-foreground/70 text-xs font-semibold'>
                {transaction.date.toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                })}
              </div>
            </div>
          </div>
          <div className='text-accent-foreground/70 line-clamp-1 text-xs font-semibold'>
            {transaction.title + ' : ' + transaction.description}
          </div>
        </div>
      </div>
    </Box>
  );
}
