import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckIcon, ChevronDown } from 'lucide-react';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Option {
  label: string;
  query: string;
}

interface OptionsFilterBoxProps {
  options: Option[];
  parameterName: string;
  placeholder: string;
  onChange: (name: string, value: string) => void;
}

export const OptionsFilterBox: React.FC<OptionsFilterBoxProps> = ({
  options,
  parameterName,
  placeholder,
  onChange,
}) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [open, setOpen] = useState(false);
  const parameterValue = params.get(parameterName);
  const value = options.find((option) => option.query === parameterValue);

  const handleSelect = (currentValue: string) => {
    const option = options.find((opt) => opt.label === currentValue);
    onChange(parameterName, option ? option.query : '');
    setOpen(false);
  };

  const select = (currentValue: string) => {
    if (currentValue !== value?.label) {
      handleSelect(currentValue);
    } else {
      onChange(parameterName, '');
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value?.label || placeholder}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.label}
                value={option.label}
                onSelect={(currentValue) => select(currentValue)}
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value?.label === option.label ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
