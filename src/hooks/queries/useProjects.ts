import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/questy/api-client";
import { CreateProjectDTO, UpdateProjectDTO } from "../../services/questy";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => api.projects.projectsControllerFindMany(),
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => api.projects.projectsControllerFindById(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectDTO) =>
      api.projects.projectsControllerCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectDTO }) =>
      api.projects.projectsControllerUpdate(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
    },
  });
};
