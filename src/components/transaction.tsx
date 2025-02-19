import Box from './box';

const transaction = {
  id: 1,
  title: 'Transaction',
  description: 'Transaction description goes here Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis incidunt nobis consequuntur iure quas. Iusto iste vitae, nulla deleniti soluta esse eveniet tempora quia dicta atque. Repellat placeat velit vitae?  ',
  amount: 1000000000,
  type: 'income',
  date: new Date(),
  tags: ['tag1', 'tag2'],
  goal: 'goal1',
};

export default function Transaction() {
  return (
    <Box className='w-full flex-col items-baseline justify-baseline gap-1.5 px-4 py-2 max-w-96'>
      <div>
        <div>
          <div className='text-accent-foreground/90 text-2xl font-semibold'>
            <span>&#8377;</span>
            {' ' + transaction.amount.toLocaleString('en-IN')}
          </div>
          <div className='flex items-center gap-1'>
            {transaction.tags.map((tag) => (
              <div
                key={tag}
                className='text-accent-foreground/80 rounded-sm border bg-black/10 px-1.5 py-0.5 text-xs dark:bg-white/10'
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className='text-accent-foreground/70 line-clamp-2 text-xs'>{transaction.description}</div>
      </div>
      <div></div>
    </Box>
  );
}
