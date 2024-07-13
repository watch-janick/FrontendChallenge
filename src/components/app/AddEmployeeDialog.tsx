import { FormInput } from "@/components/app/FormInput";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { useCreateEmployee } from "@/domains/employee/data";
import { CreateEmployeeSchema, Employee, EmployeeNameType } from "@/domains/employee/schema";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ImageUploadField } from "./ImageUploadField";

interface AddEmployeeDialogProps extends ButtonProps {
  children: React.ReactNode;
  employeeName?: EmployeeNameType;
}

export const AddEmployeeDialog = ({ employeeName, children, ...rest }: AddEmployeeDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate, isPending } = useCreateEmployee();

  const isMobile = !useBreakpoint("sm");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Employee>({
    mode: "onBlur",
    resolver: zodResolver(CreateEmployeeSchema),
    defaultValues: {
      employee_name: employeeName,
    },
  });

  useEffect(() => reset({ employee_name: employeeName }), [reset, employeeName]);

  const onSubmit: SubmitHandler<Employee> = async (data) => {
    mutate(data);
    setIsOpen(false);
    reset();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button {...rest}>{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a new employee</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the form below to add a new employee
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-4">
          <Controller
            name="profile_image"
            control={control}
            render={({ field }) => (
              <ImageUploadField
                value={field.value}
                onChange={field.onChange}
                direction={isMobile ? "column" : "row"}
                className="pb-5"
              />
            )}
          />
          <FormInput
            label="Name"
            {...register("employee_name")}
            direction={isMobile ? "column" : "row"}
            error={errors.employee_name?.message}
          />
          <FormInput
            label="Salary"
            type="number"
            {...register("employee_salary", { valueAsNumber: true })}
            direction={isMobile ? "column" : "row"}
            error={errors.employee_salary?.message}
          />
          <FormInput
            label="Age"
            type="number"
            {...register("employee_age", { valueAsNumber: true })}
            direction={isMobile ? "column" : "row"}
            error={errors.employee_age?.message}
          />
          <AlertDialogFooter>
            <Button variant="link" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} leftIcon={<UserPlus className="size-4" />}>
              {isPending ? "Adding..." : "Add"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
