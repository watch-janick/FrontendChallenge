import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, XIcon } from "lucide-react";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

interface SearchBoxProps extends InputProps {
  onSearch: (searchTerm: string) => void;
  delay?: number;
  value: string;
}

export const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ onSearch, delay = 140, className, value, ...rest }, ref) => {
    const [searchTerm, setSearchTerm] = useState<string>(value);
    const debouncedSearch = useDebounceCallback(onSearch, delay);

    useEffect(() => {
      setSearchTerm(value);
    }, [value]);

    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchTerm(newValue);
        debouncedSearch(newValue);
      },
      [debouncedSearch]
    );

    const resetSearchTerm = useCallback(() => {
      setSearchTerm("");
      debouncedSearch("");
    }, [debouncedSearch]);

    return (
      <Input
        ref={ref}
        placeholder="Search employee name..."
        value={searchTerm}
        onChange={onChange}
        layoutCompensation={false}
        className={cn("pl-9", { "pr-9": searchTerm }, className)}
        leftIcon={<Search className="size-4" />}
        rightIcon={
          searchTerm && (
            <button onClick={resetSearchTerm}>
              <XIcon className="size-4" />
            </button>
          )
        }
        {...rest}
      />
    );
  }
);
SearchBox.displayName = "SearchBox";
