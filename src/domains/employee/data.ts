import { fetcher, FetcherMethods } from "@/lib/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import { getEmployees } from "./fakeData";
import { Employee } from "./schema";

export const useGetEmployees = () =>
  useQuery<Employee[], Error>({
    queryKey: ["employees"],
    // * INFO: Uncomment to use the API
    queryFn: () => fetcher<Employee[]>('/employees'),

    // * INFO: Uncomment to use fake data and avoid hitting the API rate limit
    // queryFn: () => getEmployees(),
  });

export const useGetOneEmployee = (id: number) => {
  const queryClient = useQueryClient();

  return useQuery<Employee, Error>({
    queryKey: ["employee", id],
    // * INFO: Uncomment to use the API
    queryFn: () =>
      fetcher<Employee>('/employee/:id', {
        urlParams: { id },
      }),

    // * INFO: Uncomment to use fake data and avoid hitting the API rate limit
    // queryFn: () =>
    //   getEmployees().then((employees) =>
    //     employees.find((e) => e.id === id),
    //   ) as Promise<Employee>,
    placeholderData: () => {
      // get the data from the cache if it's available to avoid unnecessary requests
      return queryClient
        .getQueryData<Employee[]>(["employees"])
        ?.find((employee) => employee.id === id);
    },
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, Employee, { oldEmployees: Employee[] }>({
    mutationKey: ["createEmployee"],
    mutationFn: (employee: Employee) =>
      fetcher<Employee>("/create", {
        method: FetcherMethods.POST,
        body: employee,
      }),
    onMutate: async (newEmployee) => {
      // cancel any pending queries
      await queryClient.cancelQueries({ queryKey: ["employees"] });

      // retrieve current data
      const oldEmployees = queryClient.getQueryData<Employee[]>([
        "employees",
      ]) as Employee[];

      // set optimistic data
      queryClient.setQueryData<Employee[]>(["employees"], (old) => [
        newEmployee,
        ...(old || []),
      ]);

      return { oldEmployees };
    },
    onError: (_, __, context) => {
      // * INFO: Comment this out to avoid the API wiping out changes as it doesn't persist the data
      // if (context?.oldEmployees) {
      //   queryClient.setQueryData<Employee[]>(
      //     ['employees'],
      //     context.oldEmployees,
      //   )
      // } else {
      //   queryClient.invalidateQueries({ queryKey: ['employees'] })
      // }

      // warn the user
      toast.error(
        "An error occurred while creating the employee, please try again.",
      );
    },
    // * INFO: Comment this out to avoid the API wiping out changes as it doesn't persist the data
    // onSettled: () => {
    //   return queryClient.invalidateQueries({ queryKey: ['employees'] })
    // },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, Employee>({
    mutationKey: ["updateEmployee"],
    mutationFn: (employee: Employee) =>
      fetcher<Employee>("/update/:id", {
        method: FetcherMethods.PUT,
        urlParams: { id: employee.id },
        body: employee,
      }),
    onMutate: async (updatedEmployee) => {
      // cancel any pending queries
      await queryClient.cancelQueries({ queryKey: ["employees"] });
      await queryClient.cancelQueries({
        queryKey: ["employees", updatedEmployee.id],
      });

      queryClient.setQueryData(
        ["employee", updatedEmployee.id],
        updatedEmployee,
      );

      // set optimistic data
      queryClient.setQueryData<Employee[]>(["employees"], (oldData) =>
        oldData?.map((employee) =>
          employee.id === updatedEmployee.id ? updatedEmployee : employee,
        ),
      );

      // I'm not saving the old data here (like I did for the creation) but that's what I would do on a real project. Thing is I would abstract this logic for reusability across the app.
    },
    onError: (_, updatedEmployee) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({
        queryKey: ["employees", updatedEmployee.id],
      });

      toast.error(
        "An error occurred while updating the employee, please try again.",
      );
    },
    // * INFO: Comment this out to avoid the API wiping out changes as it doesn't persist the data
    onSettled: (updatedEmployee) => {
      if (updatedEmployee) {
        queryClient.invalidateQueries({
          queryKey: ["employees", updatedEmployee.id],
        });
      }
      return queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, number>({
    mutationFn: (id: number) =>
      fetcher<Employee>("/delete/:id", {
        method: FetcherMethods.DELETE,
        urlParams: { id },
      }),
    onError: () => {
      toast.error(
        "An error occurred while deleting the employee, please try again.",
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
