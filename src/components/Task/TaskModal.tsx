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
import { Lane } from "../../entities/lane";
import { User } from "../../entities/user";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import UserSelector from "./UserSelector";

interface TaskModalProps {
  open: boolean;
  task: Task.Model | null;
  laneId: string;
  onClose: () => void;
  onSave: (
    laneId: string,
    taskId: string,
    title: string,
    description: string,
    updates?: Partial<Task.UpdateDTO>
  ) => void;
}

export default function TaskModal({
  open,
  task,
  laneId,
  onClose,
  onSave,
}: TaskModalProps) {
  const [editedTask, setEditedTask] = useState<Task.Model | null>(task);
  const [userSelectorOpen, setUserSelectorOpen] = useState(false);
  const [userSelectorType, setUserSelectorType] = useState<
    "reporter" | "assignee"
  >("reporter");

  if (!task || !editedTask) return null;

  const handleSave = () => {
    if (editedTask.title.trim()) {
      onSave(laneId, task.id, editedTask.title, editedTask.description || "", {
        storyPoints: editedTask.storyPoints,
        reporter: editedTask.reporter,
        assignee: editedTask.assignee,
        laneId: editedTask.laneId,
      });
      onClose();
    }
  };

  const handleUserSelect = (user: User.Fields) => {
    setEditedTask({
      ...editedTask,
      [userSelectorType]: user,
    });
    setUserSelectorOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack spacing={1}>
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
                  value={editedTask.laneId}
                  label="Status"
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, laneId: e.target.value })
                  }
                >
                  {Lane.getAll().map((lane) => (
                    <MenuItem key={lane.id} value={lane.id}>
                      {lane.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Title"
                fullWidth
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
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
                  value={editedTask.storyPoints || ""}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      storyPoints: e.target.value
                        ? Number(e.target.value)
                        : undefined,
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
