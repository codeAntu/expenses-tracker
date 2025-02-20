import Transaction from './transaction';

export const transactions = [
  {
    id: 1,
    title: 'Transaction',
    description:
      'Transaction description goes here Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis incidunt nobis consequuntur iure quas. Iusto iste vitae, nulla deleniti soluta esse eveniet tempora quia dicta atque. Repellat placeat velit vitae?  ',
    amount: 1000000000,
    type: 'income',
    date: new Date(),
    tags: [
      {
        name: 'tag1',
        color: '',
      },
      {
        name: 'tag2',
        color: 'green',
      },
    ],
    goal: 'goal1',
  },
  {
    id: 2,
    title: 'Transaction',
    description:
      'Transaction description goes here Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis incidunt nobis consequuntur iure quas. Iusto iste vitae, nulla deleniti soluta esse eveniet tempora quia dicta atque. Repellat placeat velit vitae?  ',
    amount: 656415,
    type: 'expense',
    date: new Date(),
    tags: [
      {
        name: 'tag1',
        color: '',
      },
      {
        name: 'tag2',
        color: 'green',
      },
    ],
    goal: 'goal1',
  },
  {
    id: 3,
    title: 'Transaction',
    description:
      'Transaction description goes here Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis incidunt nobis consequuntur iure quas. Iusto iste vitae, nulla deleniti soluta esse eveniet tempora quia dicta atque. Repellat placeat velit vitae?  ',
    amount: 656415,
    type: 'expense',
    date: new Date(),
    tags: [
      {
        name: 'tag1',
        color: '',
      },
      {
        name: 'tag2',
        color: 'green',
      },
    ],
    goal: 'goal1',
  },
];

function Transactions({ date } = { date: new Date() }) {
  const formattedDate = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <div className='grid gap-3 border-l px-3.5 pt-4 pb-6'>
      <div className='flex items-center justify-between px-1'>
        <div className='text-secondary-foreground/90 flex items-center gap-2 pb-0.5 text-lg font-semibold'>
          Transactions
        </div>
        <div className='rounded-sm px-4 py-1 text-sm font-semibold text-blue-500 hover:bg-blue-500/10 hover:text-blue-500'>
          {formattedDate}
        </div>
      </div>
      <div className='flex flex-col gap-3.5 lg:grid sm:grid-cols-2 sm:gap-3.5 xl:flex'>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}

export default Transactions;
