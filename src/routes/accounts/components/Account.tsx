import { IconButton } from '@/components/lib/iconutton';
import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { CreditCard, PlusIcon, Wallet } from 'lucide-react';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router';

interface AccountProps {
  account: {
    id: string;
    title: string;
    description?: string;
    balance: string;
    icon?: string;
    color?: string;
    createdAt: string;
  };
}
const Account: FC<AccountProps> = ({ account }) => {
  const navigate = useNavigate();
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);

  return (
    <motion.div key={account.id} className='h-full'>
      <div className='card flex h-full flex-col justify-between gap-2'>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center justify-between'>
            <div className='flex aspect-square w-10 items-center justify-center rounded-lg bg-emerald-500/10'>
              <Wallet className='aspect-square w-5 text-emerald-600 dark:text-emerald-400' />
            </div>
            <div className='flex items-center gap-2'>
              <IconButton className='' size='sm'>
                <CreditCard className='' />
              </IconButton>
              {/* Deposit Dialog */}
              <Dialog open={openDeposit} onOpenChange={setOpenDeposit}>
                <DialogTrigger asChild>
                  <PlusIcon />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Deposit Funds</DialogTitle>
                  </DialogHeader>
                  <div className='flex flex-col gap-4'>
                    <Button
                      onClick={() => {
                        /* mute function here */
                      }}
                    >
                      Deposit
                    </Button>
                  </div>
                  <DialogFooter>
                    <Button variant='outline' onClick={() => setOpenDeposit(false)}>
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* Withdraw Dialog */}
              <Dialog open={openWithdraw} onOpenChange={setOpenWithdraw}>
                <DialogTrigger asChild>
                  <CreditCard className='rotate-180' />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Withdraw Funds</DialogTitle>
                  </DialogHeader>
                  <div className='flex flex-col gap-4'>
                    <Button
                      onClick={() => {
                        /* mute function here */
                      }}
                    >
                      Withdraw Money
                    </Button>
                  </div>
                  <DialogFooter>
                    <Button variant='outline' onClick={() => setOpenWithdraw(false)}>
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className=''>
            <div className='text-xl font-bold'>{account.balance}</div>
            <div className='line-clamp-1 text-sm font-medium'> {account.title}</div>
            <CardDescription className='line-clamp-2 text-xs'>{account.description}</CardDescription>
          </div>
        </div>

        <div className='pt1'>
          <Button className='w-full rounded-full' variant='outline' onClick={() => navigate(`/accounts/${account.id}`)}>
            <CreditCard className='h-4 w-4' />
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Account;
