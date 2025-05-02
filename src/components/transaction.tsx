import { ChevronDown, ChevronUp, Calendar, Tag } from 'lucide-react';
import { transactions } from './transactions';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';

export default function Transaction({ transaction }: { transaction: (typeof transactions)[0] }) {
  const isIncome = transaction.type === 'income';
  
  return (
    <Card className="w-full p-4 hover:bg-accent/40 transition-colors cursor-pointer">
      <div className="flex flex-col space-y-3">
        {/* Header with amount and indicator */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="font-semibold line-clamp-1">{transaction.title}</div>
            <div className="text-xs text-muted-foreground line-clamp-1">{transaction.description}</div>
          </div>
          <div className={cn(
            "flex items-center font-bold text-lg",
            isIncome ? "text-green-600" : "text-red-600"
          )}>
            <span>{isIncome ? '+' : '-'} ₹{transaction.amount.toLocaleString('en-IN')}</span>
            <div className={cn(
              "ml-2 rounded-full p-1",
              isIncome ? "bg-green-500/10" : "bg-red-500/10"
            )}>
              {isIncome ? (
                <ChevronUp size={16} strokeWidth={3} className="text-green-500" />
              ) : (
                <ChevronDown size={16} strokeWidth={3} className="text-red-500" />
              )}
            </div>
          </div>
        </div>

        {/* Footer with tags and date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Tag size={14} className="text-muted-foreground" />
            {transaction.tags.map((tag) => (
              <div
                key={tag.name}
                className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium"
              >
                {tag.name}
              </div>
            ))}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar size={14} className="mr-1" />
            {transaction.date.toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
