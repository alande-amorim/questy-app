import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateInviteDTO,
  AcceptInviteDTO,
} from "../../services/questy/http-client";
import api from "../../services/questy/api-client";

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
