import api from "@/lib/axiosInstance";
import { Employee, EmployeePayload } from "@/types";

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await api.get("/api/employees/get-employees");
  return response.data.data;
};

export const getEmployeeById = async (id: string): Promise<Employee> => {
  const response = await api.get<Employee>(
    `/api/employees/get-employee/${id}`
  );
  return response.data;
};

export const createEmployee = async (
  employee: EmployeePayload
): Promise<EmployeePayload> => {
  const response = await api.post<EmployeePayload>(
    "/api/employees/add-employee",
    employee
  );
  return response.data;
};
