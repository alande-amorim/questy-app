import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import WorkIcon from "@mui/icons-material/Work";
import { Link, useNavigate } from "react-router";
import ProjectSelector from "./ProjectSelector";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, route: "/dashboard" },
  // { text: "Team", icon: <GroupsIcon />, route: "/team" },
  { text: "Projects", icon: <WorkIcon />, route: "/projects" },
  // { text: "Tasks", icon: <AssignmentRoundedIcon />, route: "/tasks" }
];

export default function MenuContent() {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate("/project/create");
  };

  return (
    <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
      <Stack>
        <ProjectSelector onCreateProject={handleCreateProject} />
        <List dense sx={{ p: 1 }}>
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
    </Stack>
  );
}
