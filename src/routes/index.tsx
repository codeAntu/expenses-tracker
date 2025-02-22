import Left from '@/components/home/left';
import Mid from '@/components/home/mid';
import Right from '@/components/home/right';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div className='lg: flex flex-col xl:flex-row'>
      <div className='flex flex-1 flex-col md:flex-row'>
        <Left />
        <Mid />
      </div>
      <Right />
    </div>
  );
}
