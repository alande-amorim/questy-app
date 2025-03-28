import {
  Box,
  Paper,
  Typography,
  Stack,
  Avatar,
  Chip,
  Grid2,
  Autocomplete,
  TextField,
  IconButton,
  AvatarGroup,
  Tooltip,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ProjectLayout from "../../../../components/layouts/ProjectLayout/ProjectLayout";
import { useProject } from "../../../../hooks/queries/useProjects";
import { Link, Navigate, useParams } from "react-router";
import { UserResponseDTO } from "../../../../services/questy/http-client";
import { useMemo, useState } from "react";
import { GridCloseIcon } from "@mui/x-data-grid";
import AddUserModal from "../components/AddUserModal";
import Section from "../../../../components/layouts/AppLayout/components/Section";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials?: string;
}

interface ProjectFormData {
  code: string | null;
  name: string;
  description?: string;
  teamMembers: UserResponseDTO[];
}

export default function Members() {
  const { projectId } = useParams();
  const { data: project } = useProject(projectId || "");
  const [formData, setFormData] = useState<ProjectFormData>({
    code: null,
    name: "",
    description: "",
    teamMembers: [],
  });
  const users = useMemo(() => {
    let users: UserResponseDTO[] = [];
    const projectUsers = project?.data?.users;
    if (projectUsers) {
      users = projectUsers?.map((pu: any) => pu.user) as UserResponseDTO[];
    }
    return users;
  }, [project]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const handleChange = (field: keyof ProjectFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRemoveMember = (memberId: string) => {
    handleChange(
      "teamMembers",
      formData.teamMembers.filter((member) => member.id !== memberId)
    );
  };

  const handleAddUser = (user: User) => {
    handleChange("teamMembers", [...formData.teamMembers, user]);
  };

  if (!projectId) {
    return <Navigate to="/projects" />;
  }

  return (
    <ProjectLayout pageTitle="Members">
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "800px" } }}>
        <Section
          title="Project Members"
          action={
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => setIsAddUserModalOpen(true)}
            >
              Invite
            </Button>
          }
        >
          <Paper elevation={0} sx={{ p: 2 }}>
            <Stack spacing={2}>
              {users?.map((user) => (
                <Box
                  key={user.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderRadius: 1,
                    bgcolor: "background.default",
                    position: "relative",
                    "&:hover": {
                      "& .remove-icon": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Avatar>{user.name[0]}</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                  <Chip
                    label="Member"
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <IconButton
                    className="remove-icon"
                    size="small"
                    onClick={() => handleRemoveMember(user.id)}
                    disabled={false}
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      opacity: 0,
                      transition: "opacity 0.2s",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: "1rem",
                        color: "white",
                      },
                    }}
                  >
                    <GridCloseIcon />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Section>
      </Box>
      <AddUserModal
        open={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAdd={handleAddUser}
      />
    </ProjectLayout>
  );
}
