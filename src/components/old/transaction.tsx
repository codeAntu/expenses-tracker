import { cn } from '@/lib/utils';
import { Calendar, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { Card } from '../ui/card';
import { transactions } from './transactions';

export default function Transaction({ transaction }: { transaction: (typeof transactions)[0] }) {
  const isIncome = transaction.type === 'income';

  return (
    <Card className='hover:bg-accent/40 w-full cursor-pointer p-4 transition-colors'>
      <div className='flex flex-col space-y-3'>
        {/* Header with amount and indicator */}
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <div className='line-clamp-1 font-semibold'>{transaction.title}</div>
            <div className='text-muted-foreground line-clamp-1 text-xs'>{transaction.description}</div>
          </div>
          <div className={cn('flex items-center text-lg font-bold', isIncome ? 'text-green-600' : 'text-red-600')}>
            <span>
              {isIncome ? '+' : '-'} ₹{transaction.amount.toLocaleString('en-IN')}
            </span>
            <div className={cn('ml-2 rounded-full p-1', isIncome ? 'bg-green-500/10' : 'bg-red-500/10')}>
              {isIncome ? (
                <ChevronUp size={16} strokeWidth={3} className='text-green-500' />
              ) : (
                <ChevronDown size={16} strokeWidth={3} className='text-red-500' />
              )}
            </div>
          </div>
        </div>

        {/* Footer with tags and date */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <Tag size={14} className='text-muted-foreground' />
            {transaction.tags.map((tag) => (
              <div key={tag.name} className='bg-primary/10 rounded-md px-2 py-0.5 text-xs font-medium'>
                {tag.name}
              </div>
            ))}
          </div>
          <div className='text-muted-foreground flex items-center text-xs'>
            <Calendar size={14} className='mr-1' />
            {transaction.date.toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
