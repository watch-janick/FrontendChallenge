import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface FormInputProps extends InputProps {
  label: React.ReactNode;
  labelClassName?: string;
  inputClassName?: string;
  direction?: "row" | "column";
  ref?: React.Ref<HTMLInputElement>;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      name,
      id = name,
      label,
      className,
      labelClassName,
      inputClassName,
      direction = "row",
      error,
      required,
      ...props
    }: FormInputProps,
    innerRef: React.Ref<HTMLInputElement>
  ) => (
    <div
      className={cn(
        "w-full",
        {
          "flex flex-col gap-2": direction === "column",
          "grid grid-cols-3 items-center gap-4": direction === "row",
        },
        className
      )}
    >
      <Label
        htmlFor={id}
        className={cn(
          {
            "mb-5 text-right col-span-1": direction === "row", // compensate for the line-height of the error message in the input
          },
          labelClassName
        )}
        required={required}
        error={!!error}
      >
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        className={inputClassName}
        containerClassName={cn({
          "col-span-2": direction === "row",
        })}
        ref={innerRef}
        required={required}
        error={error}
        {...props}
      />
    </div>
  )
);
FormInput.displayName = "FormInput";
