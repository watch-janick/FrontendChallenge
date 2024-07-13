"use client";

import { Employee } from "@/domains/employee/schema";
import { useSkeleton } from "@/hooks/useSkeleton";
import { cn, formatSalary, getPictureById } from "@/lib/utils";
import { CircleDollarSign, Flame } from "lucide-react";
import Image from "next/image";
import { HTMLAttributes, useMemo } from "react";

export interface EmployeeCardProps extends HTMLAttributes<HTMLDivElement> {
  employee?: Employee;
  isLoading?: boolean;
}

const prediction: Partial<Employee> = {
  employee_name: "Janick Delot",
  employee_salary: 1000000,
  employee_age: 37,
};

export const EmployeeCard = ({
  employee,
  isLoading = false,
  className,
  ...rest
}: EmployeeCardProps) => {
  const Skeleton = useSkeleton<Employee>({
    isLoading,
    data: employee,
    prediction,
    displayPartial: true,
  });

  const picture = useMemo(
    () => employee?.profile_image || getPictureById(employee?.id || 0),
    [employee?.id, employee?.profile_image]
  );

  const isCreating = !employee?.id && !isLoading;

  return (
    <div
      className={cn(
        "space-y-4 bg-white/0 dark:bg-white/5 dark:hover:bg-white/10 transition-all border-white/5 rounded-xl p-3 pb-5 dark:hover:shadow-2xl hover:shadow-lg",
        {
          "animate-pulse cursor-wait": isCreating,
        },
        className
      )}
      {...rest}
    >
      <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden">
        {isLoading && <div className="absolute inset-0 bg-gray-400 animate-pulse" />}
        {!isLoading && (
          <Image
            className="object-cover object-center"
            src={picture}
            alt={`Portrait of ${employee?.employee_name}`}
            fill
          />
        )}
      </div>
      <h2 className="text-4xl font-montserrat font-bold text-center">
        <Skeleton value="employee_name" />
      </h2>
      <div className="flex flex-col lg:flex-row items-center gap-2 justify-around text-lg font-medium">
        <span className="flex gap-2 items-center text-red-500 dark:text-red-500">
          <Flame className="size-6" />
          <Skeleton value="employee_age" /> years old
        </span>
        <span className="flex gap-2 items-center text-yellow-600 dark:text-yellow-500">
          <CircleDollarSign className="size-6" />
          <Skeleton value="employee_salary">{(value) => formatSalary(value)}</Skeleton>
        </span>
      </div>
    </div>
  );
};
