import { ArrowLeft, Ghost } from 'lucide-react';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-white dark:bg-[#0F0F12]'>
      <Ghost className='text-primary mb-4 h-16 w-16' />
      <h1 className='mb-4 text-6xl font-bold text-gray-900 dark:text-white'>404</h1>
      <p className='mb-8 flex items-center gap-2 text-xl text-gray-600 dark:text-gray-300'>
        <Ghost className='text-primary inline h-5 w-5' />
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to='/' className='bg-primary flex items-center gap-2 rounded-md px-6 py-2 text-white transition-colors'>
        <ArrowLeft className='h-4 w-4' /> Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
