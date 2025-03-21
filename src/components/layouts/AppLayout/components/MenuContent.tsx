import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import WorkIcon from "@mui/icons-material/Work";
import GroupsIcon from "@mui/icons-material/Groups";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import { Link } from "react-router";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, route: "/dashboard" },
  // { text: "Team", icon: <GroupsIcon />, route: "/team" },
  { text: "Projects", icon: <WorkIcon />, route: "/projects" },
  // { text: "Tasks", icon: <AssignmentRoundedIcon />, route: "/tasks" }
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={index === 0}
              component={Link}
              to={item.route}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
