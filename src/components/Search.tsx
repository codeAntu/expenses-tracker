import { cn } from '@/lib/utils';
import { Search as SearchIcon, X } from 'lucide-react';
import { FC } from 'react';

interface SearchProps {
  placeholder?: string;
  value?: string;
  onSearch?: (query: string) => void;
  className?: string;
  onClear?: () => void;
}

export const Search: FC<SearchProps> = ({
  placeholder = 'Search...',
  value = '',
  onSearch,
  className = '',
  onClear,
}) => {
  return (
    <div className={cn('flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm transition-colors', className)}>
      <SearchIcon size={16} />
      <input
        type='text'
        placeholder={placeholder}
        className='flex-1 bg-transparent text-sm text-gray-800 outline-none dark:text-gray-200'
        onChange={(e) => onSearch && onSearch(e.target.value)}
        value={value}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSearch) {
            onSearch(e.currentTarget.value);
          }
        }}
      />
      {value && onClear && (
        <X
          className='h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          onClick={onClear}
        />
      )}
    </div>
  );
};
