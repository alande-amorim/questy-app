import { useQuery } from "@tanstack/react-query";
import api from "../../services/questy/api-client";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export const useAuth = () => {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const response = await api.auth.authControllerMe();
      return response;
    },
    retry: false,
    refetchInterval: 1000 * 60, // 1 minute
  });

  useEffect(() => {
    if (query.isError) {
      logout();
      navigate("/sign-in");
    }
  }, [query.isError, navigate, logout]);

  return query;
};
