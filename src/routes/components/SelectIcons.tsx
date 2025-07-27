import { GetIcon, ICONS } from '../accounts/components/GetIcon';

export function SelectIcons({
  icon,
  onSelect,
  color,
}: {
  icon: string;
  onSelect: (icon: string) => void;
  color: string;
}) {
  return (
    <div>
      <div className='mb-2 text-sm font-medium opacity-80'>Select icon:</div>
      <div className='flex gap-3'>
        {ICONS.map((i) => (
          <button
            key={i.name}
            type='button'
            className={`flex aspect-square w-10 items-center justify-center rounded-md border p-2 transition-colors ${icon === i.name ? 'border-emerald-500 bg-emerald-500/10' : 'bg-muted/30 hover:bg-muted/80'}`}
            onClick={() => onSelect(i.name)}
          >
            <GetIcon icon={i.name} color={color} />
          </button>
        ))}
      </div>
    </div>
  );
}
