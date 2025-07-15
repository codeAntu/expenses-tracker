import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tilt } from '@/components/ui/tilt';
import { cn } from '@/lib/utils';
import { Briefcase, Calendar, Home, PiggyBank, Plus, Target } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { AnimatedNumber } from '../../ui/animated-number';
import { Button } from '../../ui/button';

const Left: FC = () => {
  return (
    <div className='h-full'>
      <div className='flex flex-col gap-6 p-4 md:p-6'>
        <MoneyCard />
        <GoalsSection />
      </div>
    </div>
  );
};

const MoneyCard: FC = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(2082);
  }, []);

  return (
    <Tilt rotationFactor={0.5} className='cursor-pointer'>
      <Card className='from-primary/90 to-primary/70 text-primary-foreground overflow-hidden bg-gradient-to-br'>
        <CardContent className='p-6'>
          <div className='absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/10 blur-xl' />
          <div className='absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-xl' />

          <div className='relative z-10 space-y-4'>
            <div className='flex items-center justify-between'>
              <p className='text-xl font-medium opacity-80'>Total Balance</p>
              <PiggyBank className='h-6 w-6 opacity-80' />
            </div>

            <div className='flex items-baseline gap-1 font-mono text-5xl font-bold'>
              <span>₹</span>
              <AnimatedNumber
                springOptions={{
                  bounce: 0,
                  duration: 1500,
                }}
                value={value}
              />
            </div>

            <div className='flex items-center justify-between pt-2'>
              <div className='flex items-center gap-2'>
                <Button size='sm' variant='secondary' className='rounded-full bg-white/20 hover:bg-white/30'>
                  <Plus className='mr-1 h-4 w-4' />
                  Add Funds
                </Button>
              </div>
              <div className='flex items-center gap-1 text-sm'>
                <span className='text-green-300'>↑ 12.5%</span>
                <span className='opacity-70'>this month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Tilt>
  );
};

const GoalsSection: FC = () => {
  return (
    <Card className='max-w-lg min-w-sm shadow-md transition-shadow hover:shadow-lg'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xl font-bold'>Financial Goals</CardTitle>
        <Button variant='ghost' size='sm' className='text-primary'>
          See All
        </Button>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <Goal
            icon={<Home className='text-blue-500' />}
            name='New Home'
            description='Down payment for dream house'
            current={3000}
            target={4000}
            daysLeft={12}
            iconBg='bg-blue-500/20'
          />

          <Goal
            icon={<Briefcase className='text-purple-500' />}
            name='Emergency Fund'
            description='3 months of expenses'
            current={5000}
            target={10000}
            daysLeft={45}
            iconBg='bg-purple-500/20'
          />

          <Goal
            icon={<Calendar className='text-green-500' />}
            name='Vacation'
            description='Summer trip to Bali'
            current={1200}
            target={2500}
            daysLeft={90}
            iconBg='bg-green-500/20'
          />

          <Goal
            icon={<Target className='text-orange-500' />}
            name='Retirement'
            description='Long-term savings'
            current={50000}
            target={200000}
            daysLeft={365}
            iconBg='bg-orange-500/20'
          />

          <Button variant='outline' className='mt-2 w-full'>
            <Plus className='mr-1 h-4 w-4' />
            Add New Goal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface GoalProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  current: number;
  target: number;
  daysLeft: number;
  iconBg: string;
}

const Goal: FC<GoalProps> = ({ icon, name, description, current, target, daysLeft, iconBg }) => {
  const [progress, setProgress] = useState(0);
  const percentage = Math.round((current / target) * 100);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className={cn('rounded-lg p-2', iconBg)}>{icon}</div>
          <div>
            <div className='font-medium'>{name}</div>
            <div className='text-muted-foreground text-xs'>{description}</div>
          </div>
        </div>
        <div className='text-right'>
          <div className={cn('text-sm font-medium', daysLeft < 15 ? 'text-red-500' : 'text-amber-500')}>
            {daysLeft} days left
          </div>
          <div className='text-muted-foreground text-xs'>
            ₹{current.toLocaleString()} / ₹{target.toLocaleString()}
          </div>
        </div>
      </div>
      <Progress value={progress} className='h-2 rounded-full' />
    </div>
  );
};

export default Left;
