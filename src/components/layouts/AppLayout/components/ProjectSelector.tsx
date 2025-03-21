import {
  Box,
  Select,
  MenuItem,
  Typography,
  Divider,
  SelectChangeEvent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

interface Project {
  id: string;
  name: string;
  code: string;
}

// Mock data - replace with actual data
const mockProjects: Project[] = [
  { id: "1", name: "Project Alpha", code: "ALPHA" },
  { id: "2", name: "Project Beta", code: "BETA" },
];

interface ProjectSelectorProps {
  onCreateProject: () => void;
}

export default function ProjectSelector({
  onCreateProject,
}: ProjectSelectorProps) {
  const [selectedProject, setSelectedProject] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedProject(event.target.value);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Select
        value={selectedProject}
        onChange={handleChange}
        displayEmpty
        fullWidth
        sx={{
          border: "none",
          mb: 1,
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            gap: 1,
          },
        }}
      >
        <MenuItem value="" disabled>
          <Typography color="text.secondary">Select a project</Typography>
        </MenuItem>
        {mockProjects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                sx={{
                  bgcolor: "action.selected",
                  px: 1,
                  borderRadius: 1,
                  fontSize: "0.875rem",
                }}
              >
                {project.code}
              </Typography>
              <Typography>{project.name}</Typography>
            </Box>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            onCreateProject();
          }}
          sx={{
            color: "primary.main",
            "&:hover": {
              color: "primary.dark",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AddIcon fontSize="small" />
            <Typography>Create New Project</Typography>
          </Box>
        </MenuItem>
      </Select>
    </Box>
  );
}
