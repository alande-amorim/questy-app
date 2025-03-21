import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import { useAuthStore } from "../../../../store/useAuthStore";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router";
import IconButton from "@mui/material/IconButton";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar sizes="small" alt={user?.name} sx={{ width: 36, height: 36 }}>
          {getInitials(user?.name || "")}
        </Avatar>
        <Box
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            {user?.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
            }}
          >
            {user?.email}
          </Typography>
        </Box>

        <IconButton
          aria-label="logout"
          onClick={() => {
            logout();
            navigate("/sign-in");
          }}
        >
          <LogoutRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Drawer>
  );
}
