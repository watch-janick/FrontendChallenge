"use client";

import { AddEmployeeDialog } from "@/components/app/AddEmployeeDialog";
import { EmployeeCard } from "@/components/app/EmployeeCard";
import { SearchBox } from "@/components/app/SearchBox";
import { ThemeSwitcher } from "@/components/app/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { useGetEmployees } from "@/domains/employee/data";
import { Employee } from "@/domains/employee/schema";
import { usePrediction } from "@/hooks/usePrediction";
import { useSearch } from "@/hooks/useSearch";
import { OctagonX, RefreshCw, Squirrel, UserPlus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data: employees, isLoading: isEmployeesLoading, refetch, error } = useGetEmployees();

  const listData = usePrediction<Employee>({
    data: employees,
    isLoading: isEmployeesLoading,
    countPrediction: 24,
  });

  const { filteredData, onSearch, searchTerm, setSearchTerm } = useSearch(listData, [
    "employee_name",
  ]);

  return (
    <>
      <div className="flex justify-between gap-2 items-center">
        <h1 className="font-montserrat text-4xl font-extrabold dark:text-foreground text-neutral-900 uppercase tracking-wide">
          Employees
        </h1>
        <ThemeSwitcher />
      </div>
      <div className="flex gap-4 items-center justify-between sm:justify-normal">
        <SearchBox
          value={searchTerm}
          disabled={isEmployeesLoading}
          onSearch={onSearch}
          containerClassName="w-full max-w-[300px]"
        />
        <AddEmployeeDialog leftIcon={<UserPlus className="size-5" />} employeeName={searchTerm}>
          Add
        </AddEmployeeDialog>
      </div>
      {!error && filteredData.length > 0 && (
        <ul className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
          {filteredData?.map((employee, index) => (
            <li key={employee?.id ?? index}>
              {employee?.id && (
                <Link href={`/employee/${employee?.id}`}>
                  <EmployeeCard isLoading={isEmployeesLoading} employee={employee} />
                </Link>
              )}
              {!employee?.id && <EmployeeCard isLoading={isEmployeesLoading} employee={employee} />}
            </li>
          ))}
        </ul>
      )}
      {!error && listData.length === 0 && (
        <div className="grow flex flex-col gap-8 m-auto w-3/4 items-center justify-center">
          <Squirrel className="size-24" strokeWidth={1} />
          <p className="text-center font-medium text-lg dark:text-white">
            Nothing to see here, no employees registered yet
          </p>
        </div>
      )}
      {!error && searchTerm && filteredData.length === 0 && (
        <div className="grow flex flex-col gap-8 items-center justify-center">
          <div className="text-6xl">🤷🏼‍♀️</div>
          <p className="text-center font-medium text-lg text-neutral-500 dark:text-white">
            <span className="text-yellow-500">{searchTerm}</span> isn&apos;t registered in the
            employee directory
          </p>
          <div className="flex gap-4">
            <Button variant="link" onClick={() => setSearchTerm("")}>
              Reset search
            </Button>
            <AddEmployeeDialog
              employeeName={searchTerm}
              leftIcon={<UserPlus className="size-5 shrink-0" />}
              className="max-w-[200px] truncate"
            >
              Add <span className="text-yellow-500">{searchTerm}</span>
            </AddEmployeeDialog>
          </div>
        </div>
      )}
      {error && (
        <div className="grow flex flex-col gap-8 m-auto w-3/4 items-center justify-center">
          <OctagonX className="size-16" color="#e04040" />
          <p className="text-center font-medium text-lg dark:text-white">
            An error occurred while fetching employees, please try again
          </p>
          <div className="flex gap-4">
            <Button onClick={() => refetch()} leftIcon={<RefreshCw className="size-4 shrink-0" />}>
              Refresh
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
