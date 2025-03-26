import {
  TextField,
  Button,
  Box,
  Avatar,
  Autocomplete,
  Typography,
  AvatarGroup,
  Tooltip,
  Grid2,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Section from "../../../../components/layouts/AppLayout/components/Section";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import AddUserModal from "./AddUserModal";
import { useCreateProject } from "../../../../hooks/queries/useProjects";
import { useNavigate } from "react-router";

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
  teamMembers: User[];
}

// Mock users data - replace with actual API call
const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", initials: "JD" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", initials: "JS" },
  // Add more mock users as needed
];

export default function Form(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectFormData>({
    code: null,
    name: "",
    description: "",
    teamMembers: [],
  });
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const { mutate: createProject, isPending } = useCreateProject();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createProject(
      {
        code: formData.code,
        name: formData.name,
        description: formData.description || "",
      },
      {
        onSuccess: () => {
          navigate("/projects");
        },
      }
    );
  };

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

  return (
    <Section
      title="Create Project"
      footer={
        <Button
          color="primary"
          variant="contained"
          type="submit"
          form="project-form"
          disabled={isPending}
        >
          {isPending ? <CircularProgress size={24} /> : "Create Project"}
        </Button>
      }
    >
      <Box
        id="project-form"
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          id="name"
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          variant="outlined"
          required
          fullWidth
          disabled={isPending}
        />

        <TextField
          id="description"
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          disabled={isPending}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Grid2 container spacing={2} columns={12}>
            <Grid2
              size={6}
              sx={{ display: "flex", flexDirection: "row", gap: 1 }}
            >
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Add Members ({formData.teamMembers.length})
              </Typography>
              <Autocomplete
                multiple
                id="team-members"
                options={mockUsers}
                value={formData.teamMembers}
                onChange={(_, newValue) =>
                  handleChange("teamMembers", newValue)
                }
                getOptionLabel={(option) => option.name}
                sx={{ flex: 1 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search"
                    variant="outlined"
                    size="small"
                    disabled={isPending}
                  />
                )}
                renderTags={() => null}
              />
            </Grid2>
            <Grid2 size={6} />
            <Grid2 size={6}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                {formData.teamMembers.length > 0 && (
                  <AvatarGroup
                    max={6}
                    sx={{
                      "& .MuiAvatar-root": {
                        width: 64,
                        height: 64,
                        fontSize: "0.875rem",
                        position: "relative",
                        "&:hover .remove-icon": {
                          opacity: 1,
                        },
                      },
                    }}
                  >
                    {formData.teamMembers.map((member) => (
                      <Box
                        key={member.id}
                        sx={{
                          position: "relative",
                          "&:hover": {
                            "& .remove-icon": {
                              opacity: 1,
                            },
                          },
                        }}
                      >
                        <Tooltip title={member.name}>
                          <Avatar alt={member.name}>{member.initials}</Avatar>
                        </Tooltip>
                        <IconButton
                          className="remove-icon"
                          size="small"
                          onClick={() => handleRemoveMember(member.id)}
                          disabled={isPending}
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
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    ))}
                  </AvatarGroup>
                )}
                <IconButton
                  onClick={() => setIsAddUserModalOpen(true)}
                  disabled={isPending}
                  sx={{
                    width: 64,
                    height: 64,
                    border: "2px dashed",
                    borderColor: "divider",
                    borderRadius: "50%",
                    "&:hover": {
                      borderColor: "primary.main",
                      "& .MuiSvgIcon-root": {
                        color: "primary.main",
                      },
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
      <AddUserModal
        open={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAdd={handleAddUser}
      />
    </Section>
  );
}
