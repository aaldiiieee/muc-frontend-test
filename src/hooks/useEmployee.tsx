import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchEmployees,
  createEmployee,
  getEmployeeById,
} from "@/services/employee.service";

export const useEmployee = () => {
  const queryClient = useQueryClient();

  const employeesQuery = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });

  const createEmployeeMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const useEmployeeQuery = (id: string) => {
    return useQuery({
      queryKey: ["employee", id],
      queryFn: () => getEmployeeById(id),
      staleTime: 60 * 60 * 1000,
    });
  };

  return {
    employeesQuery,
    createEmployeeMutation,
    useEmployeeQuery,
  };
};
