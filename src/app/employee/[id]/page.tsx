"use client";

import { DeleteEmployeeButton } from "@/components/app/DeleteEmployeeButton";
import { EmployeeCard } from "@/components/app/EmployeeCard";
import { ThemeSwitcher } from "@/components/app/ThemeSwitcher";
import { UpdateEmployeeDialog } from "@/components/app/UpdateEmployeeDialog";
import { Button } from "@/components/ui/button";
import { useDeleteEmployee, useGetOneEmployee } from "@/domains/employee/data";
import { Employee, EmployeeIdSchema } from "@/domains/employee/schema";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

const EmployeeDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const employeeId = EmployeeIdSchema.parse(Number(params.id));

  const { data: employee, isLoading, error } = useGetOneEmployee(employeeId);
  const deleteMutation = useDeleteEmployee();

  const handleDelete = useCallback(async () => {
    await deleteMutation.mutateAsync(employeeId);
    router.push("/");
  }, [deleteMutation, employeeId, router]);

  if (error) {
    return <div>Error loading employee: {error.message}</div>;
  }

  if (!employee && !isLoading) {
    return <div>Employee not found</div>;
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-montserrat text-4xl font-extrabold dark:text-foreground text-neutral-900 uppercase">
          Details
        </h1>
        <div className="flex gap-2 items-center">
          <Link href="/">
            <Button variant="link" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="space-y-4 max-w-md w-full m-auto">
        <EmployeeCard employee={employee} isLoading={isLoading} />
        <div className="flex gap-4 justify-between">
          <DeleteEmployeeButton
            disabled={isLoading}
            loading={deleteMutation.isPending}
            onDelete={handleDelete}
            isDeleting={deleteMutation.isPending}
          />
          <UpdateEmployeeDialog employee={employee as Employee}>Edit</UpdateEmployeeDialog>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetailPage;
