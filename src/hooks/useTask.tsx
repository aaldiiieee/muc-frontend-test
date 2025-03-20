import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask } from "@/services/task.service";

export const useTask = () => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return {
    createTaskMutation,
    deleteTaskMutation,
  };
};
