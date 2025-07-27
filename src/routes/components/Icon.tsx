interface IconProps {
  children?: React.ReactNode;
}

export const IconBorder: React.FC<IconProps> = ({ children }) => {
  return <div className='rounded-md border border-black/30 p-1.5 opacity-60 dark:border-white/30'>{children}</div>;
};
