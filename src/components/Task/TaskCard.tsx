import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  ClickAwayListener,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { Task } from "../../entities/task";

interface TaskCardProps {
  task: Task.Model;
  laneId: string;
  onSave: (
    laneId: string,
    taskId: string,
    title: string,
    description: string,
    updates?: Partial<Task.UpdateDTO>
  ) => void;
  onClick: (task: Task.Model) => void;
  onMaximize: (task: Task.Model) => void;
  onEdit: (task: Task.Model) => void;
}

export default function TaskCard({
  task,
  laneId,
  onSave,
  onClick,

  onEdit,
}: TaskCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(task);
  };

  if (task.metadata?.isEditing) {
    return (
      <ClickAwayListener
        onClickAway={() =>
          onSave(laneId, task.id, task.title, task.description || "")
        }
      >
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 1,
            transition: "all 0.2s",
          }}
        >
          <Stack spacing={1}>
            <TextField
              autoFocus
              placeholder="Enter title"
              variant="standard"
              fullWidth
              value={task.title}
              onChange={(e) => onEdit({ ...task, title: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSave(laneId, task.id, task.title, task.description || "");
                }
              }}
            />
            <TextField
              placeholder="Enter description (optional)"
              variant="standard"
              fullWidth
              multiline
              rows={2}
              value={task.description}
              onChange={(e) => onEdit({ ...task, description: e.target.value })}
            />
          </Stack>
        </Paper>
      </ClickAwayListener>
    );
  }

  return (
    <Card
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        position: "relative",
        overflow: "visible",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        {task.assignee && (
          <Avatar
            sx={{
              position: "absolute",
              zIndex: 100,
              top: -10,
              right: -5,
              width: 24,
              height: 24,
              fontSize: "0.75rem",
            }}
          >
            {task.assignee.name[0]}
          </Avatar>
        )}
        <Stack spacing={1}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {task.code}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {task.title}
          </Typography>
          {task.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {task.description}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
