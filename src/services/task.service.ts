import api from "@/lib/axiosInstance";
import { TaskPayload } from "@/types";

export const createTask = async (task: TaskPayload): Promise<TaskPayload> => {
  const response = await api.post<TaskPayload>("/api/tasks/add-task", task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await api.delete(`/api/tasks/delete-task/${id}`);
  return response.data;
};