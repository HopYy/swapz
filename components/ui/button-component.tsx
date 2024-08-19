import { cn } from '@/utils/cn';
import { ButtonLoader } from '@/components/loading';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  spinner?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  spinner = true,
  className,
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'w-full max-w-96 h-10 mx-auto rounded-md bg-black',
        disabled && 'bg-gray-500 cursor-not-allowed',
        !spinner && disabled && 'bg-gray-500 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {disabled && spinner ? <ButtonLoader /> : children}
    </button>
  );
};
