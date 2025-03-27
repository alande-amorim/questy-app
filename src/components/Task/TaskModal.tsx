import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { Task } from "../../entities/task";
import UserSelector from "../User/UserSelector";
import { UserResponseDTO, UserDTO } from "../../services/questy/http-client";

interface TaskModalProps {
  open: boolean;
  task: Task.Model | null;
  status: Task.StatusType;
  onClose: () => void;
  onSave: () => void;
  onEdit: (task: Task.Model) => void;
  title?: string;
  users: UserResponseDTO[];
}

export default function TaskModal({
  open,
  task,
  status,
  onClose,
  onSave,
  onEdit,
  title = "Edit Task",
  users,
}: TaskModalProps) {
  const [editedTask, setEditedTask] = useState<Task.Model | null>(task);

  if (!task || !editedTask) return null;

  const handleChange = (changes: Partial<Task.Model>) => {
    const updatedTask = { ...editedTask, ...changes };
    setEditedTask(updatedTask);
    onEdit(updatedTask);
  };

  const handleSave = () => {
    if (editedTask.title.trim()) {
      onSave();
      onClose();
    }
  };

  const mapUserToUserDTO = (user: UserResponseDTO): UserDTO => ({
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack spacing={1}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="overline" color="text.secondary">
            {task.code}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Stack spacing={3} sx={{ flex: 1, mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={editedTask.status}
                label="Status"
                onChange={(e) =>
                  handleChange({ status: e.target.value as Task.StatusType })
                }
              >
                {Task.lanes.map((lane) => (
                  <MenuItem key={lane} value={lane}>
                    {lane}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Title"
              fullWidth
              required
              value={editedTask.title}
              onChange={(e) => handleChange({ title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              required
              value={editedTask.description}
              onChange={(e) => handleChange({ description: e.target.value })}
            />
          </Stack>
          <Box
            sx={{
              width: 280,
              borderLeft: "1px solid",
              borderColor: "divider",
              pl: 2,
              pt: 1,
            }}
          >
            <Stack spacing={3}>
              <TextField
                label="Story Points"
                type="number"
                required
                value={editedTask.storyPoints || 0}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1 && value <= 100) {
                    handleChange({ storyPoints: value });
                  }
                }}
              />
              <UserSelector
                label="Reporter *"
                value={editedTask.reporter?.id || null}
                users={users}
                onChange={(value) =>
                  handleChange({
                    reporter: value
                      ? mapUserToUserDTO(users.find((u) => u.id === value)!)
                      : undefined,
                  })
                }
              />
              <UserSelector
                label="Assignee"
                value={editedTask.assignee?.id || null}
                users={users}
                onChange={(value) =>
                  handleChange({
                    assignee: value
                      ? mapUserToUserDTO(users.find((u) => u.id === value)!)
                      : null,
                  })
                }
              />
            </Stack>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
