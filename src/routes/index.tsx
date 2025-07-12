import AddAmount from '@/components/addAmount';
import Left from '@/components/home/left';
import Mid from '@/components/home/mid';
import Right from '@/components/home/right';

function App() {
  return (
    <div className='flex min-h-[calc(100dvh-8rem)] w-full flex-col xl:flex-row'>
      <div className='flex flex-1 flex-col md:flex-row'>
        <Left />
        <div className='max-h-screen w-full overflow-y-auto md:w-2/3 xl:w-3/4'>
          <Mid />
        </div>
      </div>
      <Right />
      <div className='fixed right-4 bottom-4 z-50 sm:right-10 sm:bottom-10'>
        <AddAmount />
      </div>
    </div>
  );
}

export default App;