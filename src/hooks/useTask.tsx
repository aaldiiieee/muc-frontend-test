import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/services/task.service";

export const useTask = () => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return {
    createTaskMutation
  };
};
