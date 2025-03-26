import { Outlet } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../hooks/queries/useAuth";

export default function PrivateRoute() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <Outlet />;
}
