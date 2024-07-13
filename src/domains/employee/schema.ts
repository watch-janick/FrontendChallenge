import { zoptional } from "@/lib/utils";
import { z } from "zod";

export const EmployeeIdSchema = z.number().positive();
export type EmployeeIdType = z.infer<typeof EmployeeIdSchema>;

export const EmployeeNameSchema = z.string().min(1);
export type EmployeeNameType = z.infer<typeof EmployeeNameSchema>;

export const EmployeeSalarySchema = z.number().positive();
export type EmployeeSalaryType = z.infer<typeof EmployeeSalarySchema>;

export const EmployeeAgeSchema = z.number().positive();
export type EmployeeAgeType = z.infer<typeof EmployeeAgeSchema>;

export const EmployeeProfileImageSchema = zoptional(z.string().url());
export type EmployeeProfileImageType = z.infer<typeof EmployeeProfileImageSchema>;

export const EmployeeSchema = z.object({
  id: EmployeeIdSchema,
  employee_name: EmployeeNameSchema,
  employee_salary: EmployeeSalarySchema,
  employee_age: EmployeeAgeSchema,
  profile_image: EmployeeProfileImageSchema,
});

export const CreateEmployeeSchema = EmployeeSchema.omit({ id: true });
export const UpdateEmployeeSchema = EmployeeSchema;

export type Employee = z.infer<typeof EmployeeSchema>;
