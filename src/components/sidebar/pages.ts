import {
  BarChart2,
  Building2,
  CreditCard,
  Folder,
  HelpCircle,
  Home,
  Landmark,
  MessagesSquare,
  Receipt,
  Settings,
  Settings2Icon,
  Shield,
  Users2,
  Video,
  Wallet,
} from 'lucide-react';

export type NavPage = {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const overviewPages: NavPage[] = [
  { name: 'Dashboard', href: '/', icon: Home },
  {
    name: 'Accounts',
    href: '/account',
    icon: Wallet,
  },
  {
    name: 'All Accounts',
    href: '/accounts/all',
    icon: Landmark,
  },
  {
    name: 'Expenses',
    href: '/expenses',
    icon: Wallet,
  },
  {
    name: 'Test',
    href: '/test',
    icon: Settings2Icon,
  },
  { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  { name: 'Organization', href: '/organization', icon: Building2 },
  { name: 'Projects', href: '/projects', icon: Folder },
];

export const financePages: NavPage[] = [
  { name: 'Transactions', href: '#', icon: Wallet },
  { name: 'Invoices', href: '#', icon: Receipt },
  { name: 'Payments', href: '#', icon: CreditCard },
];
export const teamPages: NavPage[] = [
  { name: 'Members', href: '#', icon: Users2 },
  { name: 'Permissions', href: '#', icon: Shield },
  { name: 'Chat', href: '#', icon: MessagesSquare },
  { name: 'Meetings', href: '#', icon: Video },
];
export const teamsPages: NavPage[] = [{ name: 'Haviteams', href: '#', icon: Users2 }];
export const settingsPages: NavPage[] = [
  { name: 'Settings', href: '#', icon: Settings },
  { name: 'Help', href: '#', icon: HelpCircle },
];
