import { Link, useLocation } from 'react-router';
import { NavPage } from './pages';
import { cn } from '@/lib/utils';

interface NavItemProps {
  link: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

export function NavItem({ link, icon: Icon, children }: NavItemProps) {
  const path = useLocation().pathname;
  const isActive = path.endsWith(link || '') || path.endsWith(`/${link}`) || path.startsWith(`${link}/`);

  return (
    <Link
      to={link}
      className={cn(
        'flex items-center rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#1F1F23] dark:hover:text-white',
        isActive ? 'bg-gray-100 dark:bg-[#1F1F23]' : '',
      )}
    >
      <Icon className='mr-3 h-4 w-4 flex-shrink-0' />
      {children}
    </Link>
  );
}

export function NavSection({ title, pages }: { title: string; pages: NavPage[] }) {
  return (
    <div>
      <div className='mb-2 px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400'>
        {title}
      </div>
      <div className='space-y-1'>
        {pages.map((page) => (
          <NavItem key={page.name} link={page.href} icon={page.icon}>
            {page.name}
          </NavItem>
        ))}
      </div>
    </div>
  );
}
