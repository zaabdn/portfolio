"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { dataStacks } from "@/data/multiSelector";

import { cn } from "@/lib/utils";

interface MultipleSelectorProps {
  value: string[];
  onValueChange: (val: string) => void;
}

const MultipleSelector = ({ value, onValueChange }: MultipleSelectorProps) => {
  const [open, setOpen] = React.useState(false);

  const data = [...new Set([...value, ...dataStacks])];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[480px] justify-between"
        >
          <div className="flex gap-2 justify-start">
            {value?.length
              ? value.map((val, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
                  >
                    {val}
                  </div>
                ))
              : "Select framework..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {data.map((framework) => (
                <CommandItem
                  key={framework}
                  value={framework}
                  onSelect={() => {
                    onValueChange(framework);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(framework) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultipleSelector;
