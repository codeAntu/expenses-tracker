import { CreditCard, Wallet } from 'lucide-react';

export const ICONS = [
  { name: 'wallet', component: Wallet },
  { name: 'credit-card', component: CreditCard },
];

export function getIconComponent(icon: string) {
  const found = ICONS.find((i) => i.name === icon);
  return found ? found.component : Wallet;
}

export function GetIcon({ icon, color, className }: { icon: string; color: string; className?: string }) {
  const IconComp = getIconComponent(icon);
  return <IconComp style={{ color }} className={className} />;
}
