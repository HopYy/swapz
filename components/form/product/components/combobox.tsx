'use client';

import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface OptionValue {
  label: string;
}

interface ComboboxComponentProp {
  placeholder: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  comboboxFormValues: OptionValue[];
}

export const ComboboxComponent: React.FC<ComboboxComponentProp> = ({
  placeholder,
  value,
  disabled,
  onChange,
  comboboxFormValues,
}) => {
  const [open, setOpen] = useState(false);
  const [comboboxValue, setComboboxValue] = useState(value);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === comboboxValue ? '' : currentValue;
    setComboboxValue(newValue);
    setOpen(false);
    onChange(newValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          aria-expanded={open}
          className="w-[200px] justify-between m-0"
        >
          {comboboxValue
            ? comboboxFormValues.find((form) => form.label === comboboxValue)
                ?.label
            : `Select ${placeholder}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 text-center">
        <Command>
          <CommandGroup>
            {comboboxFormValues.map((form) => (
              <CommandItem
                key={form.label}
                value={form.label}
                onSelect={() => handleSelect(form.label)}
                className="text-start"
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    comboboxValue === form.label ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {form.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
