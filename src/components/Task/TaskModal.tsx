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
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { Task } from "../../entities/task";
import { User } from "../../entities/user";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import UserSelector from "./UserSelector";

interface TaskModalProps {
  open: boolean;
  task: Task.Model | null;
  status: Task.StatusType;
  onClose: () => void;
  onSave: () => void;
  onEdit: (task: Task.Model) => void;
  title?: string;
}

export default function TaskModal({
  open,
  task,
  status,
  onClose,
  onSave,
  onEdit,
  title = "Edit Task",
}: TaskModalProps) {
  const [editedTask, setEditedTask] = useState<Task.Model | null>(task);
  const [userSelectorOpen, setUserSelectorOpen] = useState(false);
  const [userSelectorType, setUserSelectorType] = useState<
    "reporter" | "assignee"
  >("reporter");

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

  const handleUserSelect = (user: User.Fields) => {
    handleChange({ [userSelectorType]: user });
    setUserSelectorOpen(false);
  };

  return (
    <>
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
                  value={editedTask.storyPoints || ""}
                  onChange={(e) =>
                    handleChange({
                      storyPoints: e.target.value ? Number(e.target.value) : 0,
                    })
                  }
                />
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Reporter
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {editedTask.reporter ? (
                      <>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {editedTask.reporter.name[0]}
                        </Avatar>
                        <Typography variant="body2">
                          {editedTask.reporter.name}
                        </Typography>
                      </>
                    ) : (
                      <Tooltip title="Set reporter">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setUserSelectorType("reporter");
                            setUserSelectorOpen(true);
                          }}
                        >
                          <PersonIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Assignee
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {editedTask.assignee ? (
                      <>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {editedTask.assignee.name[0]}
                        </Avatar>
                        <Typography variant="body2">
                          {editedTask.assignee.name}
                        </Typography>
                      </>
                    ) : (
                      <Tooltip title="Set assignee">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setUserSelectorType("assignee");
                            setUserSelectorOpen(true);
                          }}
                        >
                          <AssignmentIndIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
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

      <UserSelector
        open={userSelectorOpen}
        title={`Select ${
          userSelectorType === "reporter" ? "Reporter" : "Assignee"
        }`}
        onClose={() => setUserSelectorOpen(false)}
        onSelect={handleUserSelect}
        selectedUser={
          userSelectorType === "reporter"
            ? editedTask.reporter
            : editedTask.assignee
        }
      />
    </>
  );
}
