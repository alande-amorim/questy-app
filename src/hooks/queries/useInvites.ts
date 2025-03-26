import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../services/questy/api-client";
import { AcceptInviteDTO, CreateInviteDTO } from "../../services/questy";

export const useCreateInvite = (projectId: string) => {
  const questyQueryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInviteDTO) =>
      api.projects.inviteControllerCreateInvite(data),
    onSuccess: () => {
      questyQueryClient.invalidateQueries({
        queryKey: ["project", projectId, "invites"],
      });
    },
  });
};

export const useAcceptInvite = () => {
  return useMutation({
    mutationFn: (data: AcceptInviteDTO) =>
      api.projects.inviteControllerAcceptInvite(data),
  });
};
