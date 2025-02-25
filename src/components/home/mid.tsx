import { FC } from 'react';
import { Chart } from '../chart';

const Mid: FC = () => {
  return (
    <div className='bg-red grid grid-cols-2 gap-5 p-8'>
      <Chart />
      <Chart />
    </div>
  );
};

export default Mid;
