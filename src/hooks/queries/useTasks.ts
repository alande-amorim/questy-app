import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateTaskDTO,
  UpdateTaskDTO,
} from "../../services/questy/http-client";
import api from "../../services/questy/api-client";

export const useProjectTasks = (projectId: string) => {
  return useQuery({
    queryKey: ["project", projectId, "tasks"],
    queryFn: () => api.projects.tasksControllerFindMany(projectId),
    enabled: !!projectId,
  });
};

export const useTask = (projectId: string, taskId: string) => {
  return useQuery({
    queryKey: ["project", projectId, "task", taskId],
    queryFn: () => api.projects.tasksControllerFindOne(projectId, taskId),
    enabled: !!projectId && !!taskId,
  });
};

export const useCreateTask = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskDTO) =>
      api.projects.tasksControllerCreate(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId, "tasks"],
      });
    },
  });
};

export const useUpdateTask = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: UpdateTaskDTO }) =>
      api.projects.tasksControllerUpdate(projectId, taskId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId, "tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", projectId, "task", variables.taskId],
      });
    },
  });
};

export const useDeleteTask = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) =>
      api.projects.tasksControllerRemove(projectId, taskId),
    onSuccess: (_, taskId) => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId, "tasks"],
      });
      queryClient.removeQueries({
        queryKey: ["project", projectId, "task", taskId],
      });
    },
  });
};
