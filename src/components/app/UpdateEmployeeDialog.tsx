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
import { useUpdateEmployee } from "@/domains/employee/data";
import { Employee, UpdateEmployeeSchema } from "@/domains/employee/schema";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPen } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ImageUploadField } from "./ImageUploadField";

interface AddEmployeeDialogProps extends ButtonProps {
  children: React.ReactNode;
  employee: Employee;
}

export const UpdateEmployeeDialog = ({ employee, children, ...rest }: AddEmployeeDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate, isPending } = useUpdateEmployee();

  const isMobile = !useBreakpoint("sm");

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
  } = useForm<Employee>({
    mode: "onBlur",
    resolver: zodResolver(UpdateEmployeeSchema),
    defaultValues: employee,
  });

  useEffect(() => {
    // prevent from resetting the form if the user has made changes
    if (!isDirty) {
      reset(employee);
    }
  }, [employee, reset, isDirty]);

  const onSubmit: SubmitHandler<Employee> = useCallback(
    async (data) => {
      mutate(data);
      reset();
      setIsOpen(false);
    },
    [mutate, reset]
  );

  const onCancel = useCallback(() => {
    reset();
    setIsOpen(false);
  }, [reset]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button {...rest}>{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update {employee?.employee_name} infos</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the form below to update {employee?.employee_name}&apos;s informations
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-4">
          <input type="hidden" {...register("id")} />
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
            <Button type="button" disabled={isPending} variant="link" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} leftIcon={<UserPen className="size-4" />}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
