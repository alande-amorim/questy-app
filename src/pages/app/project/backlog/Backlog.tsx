import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import ProjectLayout from "../../../../components/layouts/ProjectLayout/ProjectLayout";
import Section from "../../../../components/layouts/AppLayout/components/Section";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  assignee?: string;
}

// Mock data - replace with actual data
const tasks: Task[] = [
  {
    id: "1",
    title: "Design user interface",
    priority: "high",
    status: "todo",
    assignee: "John Doe",
  },
  {
    id: "2",
    title: "Implement authentication",
    priority: "high",
    status: "in-progress",
    assignee: "Jane Smith",
  },
  {
    id: "3",
    title: "Write documentation",
    priority: "medium",
    status: "todo",
  },
];

const priorityColors = {
  low: "info",
  medium: "warning",
  high: "error",
} as const;

const statusColors = {
  todo: "default",
  "in-progress": "primary",
  done: "success",
} as const;

export default function Backlog() {
  return (
    <ProjectLayout pageTitle="Backlog">
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <Section
          title="Backlog"
          action={
            <Button variant="contained" endIcon={<AddIcon />}>
              Add Task
            </Button>
          }
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="backlog table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="center">Priority</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Assignee</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow
                    key={task.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {task.title}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={task.priority}
                        color={priorityColors[task.priority]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={task.status}
                        color={statusColors[task.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {task.assignee || "Unassigned"}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Section>
      </Box>
    </ProjectLayout>
  );
}
