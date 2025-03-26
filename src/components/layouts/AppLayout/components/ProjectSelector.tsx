import {
  Box,
  Select,
  MenuItem,
  Typography,
  Divider,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useProjects } from "../../../../hooks/queries/useProjects";
import { ProjectResponseDTO } from "../../../../services/questy/http-client";

interface ProjectSelectorProps {
  onCreateProject: () => void;
  onSelectProject?: (projectId: string) => void;
}

export default function ProjectSelector({
  onCreateProject,
  onSelectProject,
}: ProjectSelectorProps) {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const { data: projects, isLoading } = useProjects();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const projectId = event.target.value;
    setSelectedProject(projectId);
    onSelectProject?.(projectId);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

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
        {projects?.map((project: ProjectResponseDTO) => (
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
