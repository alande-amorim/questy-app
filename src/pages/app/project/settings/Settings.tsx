import {
  Box,
  Button,
  TextField,
  Stack,
  Switch,
  FormControlLabel,
  Divider,
  Typography,
} from "@mui/material";
import ProjectLayout from "../../../../components/layouts/ProjectLayout/ProjectLayout";
import Section from "../../../../components/layouts/AppLayout/components/Section";
import { useState } from "react";

interface ProjectSettings {
  name: string;
  code: string;
  description: string;
  isPrivate: boolean;
  allowGuestAccess: boolean;
  notificationsEnabled: boolean;
}

export default function Settings() {
  const [settings, setSettings] = useState<ProjectSettings>({
    name: "Project Name",
    code: "PRJ",
    description: "Project description",
    isPrivate: true,
    allowGuestAccess: false,
    notificationsEnabled: true,
  });

  const handleChange = (field: keyof ProjectSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Settings saved:", settings);
    // Add your save logic here
  };

  return (
    <ProjectLayout pageTitle="Settings">
      <Box
        sx={{
          width: "100%",
          maxWidth: { sm: "100%", md: "700px" },
        }}
      >
        <Section
          title="Project Settings"
          footer={
            <Button
              color="primary"
              variant="contained"
              type="submit"
              form="settings-form"
            >
              Save Changes
            </Button>
          }
        >
          <Box
            component="form"
            id="settings-form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Stack spacing={3}>
              <Typography variant="h6">General</Typography>
              <TextField
                label="Project Name"
                value={settings.name}
                onChange={(e) => handleChange("name", e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Project Code"
                value={settings.code}
                onChange={(e) => handleChange("code", e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Description"
                value={settings.description}
                onChange={(e) => handleChange("description", e.target.value)}
                multiline
                rows={4}
                fullWidth
              />
            </Stack>

            <Divider />

            <Stack spacing={2}>
              <Typography variant="h6">Privacy</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.isPrivate}
                    onChange={(e) =>
                      handleChange("isPrivate", e.target.checked)
                    }
                  />
                }
                label="Private Project"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.allowGuestAccess}
                    onChange={(e) =>
                      handleChange("allowGuestAccess", e.target.checked)
                    }
                  />
                }
                label="Allow Guest Access"
              />
            </Stack>

            <Divider />

            <Stack spacing={2}>
              <Typography variant="h6">Notifications</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notificationsEnabled}
                    onChange={(e) =>
                      handleChange("notificationsEnabled", e.target.checked)
                    }
                  />
                }
                label="Enable Notifications"
              />
            </Stack>

            <Divider />

            <Stack spacing={2}>
              <Typography variant="h6" color="error">
                Danger Zone
              </Typography>
              <Button
                variant="outlined"
                color="error"
                sx={{ alignSelf: "flex-start" }}
              >
                Delete Project
              </Button>
            </Stack>
          </Box>
        </Section>
      </Box>
    </ProjectLayout>
  );
}
