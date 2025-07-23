import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { NavSection } from './NavItem';
import { financePages, overviewPages, settingsPages, teamPages, teamsPages } from './pages';

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <button
        type='button'
        className='fixed top-4 left-4 z-[70] rounded-lg bg-white p-2 shadow-md lg:hidden dark:bg-[#0F0F12]'
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className='h-5 w-5 text-gray-600 dark:text-gray-300' />
      </button>
      <nav
        className={`fixed inset-y-0 left-0 z-[70] w-64 transform border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out lg:static lg:w-64 lg:translate-x-0 dark:border-[#1F1F23] dark:bg-[#0F0F12] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} `}
      >
        <div className='flex h-full flex-col'>
          <Link
            to='/'
            target='_blank'
            rel='noopener noreferrer'
            className='flex h-16 items-center border-b border-gray-200 px-6 dark:border-[#1F1F23]'
          >
            <div className='flex items-center gap-3'>
              <span className='text-lg font-semibold text-gray-900 hover:cursor-pointer dark:text-white'>
                Expense Tracker
              </span>
            </div>
          </Link>

          <div className='flex-1 overflow-y-auto px-4 py-4'>
            <div className='space-y-6'>
              <NavSection title='Overview' pages={overviewPages} />
              <NavSection title='Finance' pages={financePages} />
              <NavSection title='Team' pages={teamPages} />
              <NavSection title='Teams' pages={teamsPages} />
            </div>
          </div>

          <div className='border-t border-gray-200 px-4 py-4 dark:border-[#1F1F23]'>
            <NavSection title='' pages={settingsPages} />
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className='bg-opacity-50 fixed inset-0 z-[65] bg-black/30 transition-opacity duration-200 lg:hidden'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
