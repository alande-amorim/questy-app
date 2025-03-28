import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import { Link, useParams } from "react-router";
import ProjectSelector from "../../AppLayout/components/ProjectSelector";

const getProjectMenuItems = (projectId: string) => [
  {
    text: "Board",
    icon: <DashboardIcon />,
    route: `/project/${projectId}/board`,
  },
  {
    text: "Members",
    icon: <GroupIcon />,
    route: `/project/${projectId}/members`,
  },
];

export default function MenuContent() {
  const { projectId } = useParams();
  const menuItems = getProjectMenuItems(projectId || "");

  return (
    <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
      <Stack>
        <ProjectSelector onCreateProject={() => {}} />
        <List dense sx={{ p: 1 }}>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton component={Link} to={item.route}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Stack>
  );
}
