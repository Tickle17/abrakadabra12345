import * as React from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/shared/shadcn';
import { Button } from '@/shared/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

export type PComboBox = {
  items: { value: string; label: string }[];
  values: string[];
  setValues: (values: string[]) => void;
  triggerBtnLabel: string;
  searchInputPlaceholder: string;
  searchEmptyPlaceholder: string;
};

export const Combobox = ({
  items,
  values,
  setValues,
  triggerBtnLabel,
  searchInputPlaceholder,
  searchEmptyPlaceholder,
}: PComboBox) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="px-5 py-[6px] rounded-[2px] text-xs font-thin w-fit h-fit bg-slate-950 text-white hover:bg-slate-950 hover:text-white hover:opacity-75 transition-all"
        >
          {triggerBtnLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchInputPlaceholder} />
          <CommandList>
            <CommandEmpty>{searchEmptyPlaceholder}</CommandEmpty>
            <CommandGroup>
              {items.map(item => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={currentValue => {
                    switch (values.includes(currentValue)) {
                      case true:
                        setValues(values.filter(v => v !== currentValue));
                        break;
                      case false:
                        setValues([...values, currentValue]);
                        break;
                    }
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      values.includes(item.value) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
