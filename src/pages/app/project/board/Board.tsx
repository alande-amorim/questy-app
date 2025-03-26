import {
  Box,
  Paper,
  Typography,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import ProjectLayout from "../../../../components/layouts/ProjectLayout/ProjectLayout";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import TaskCard from "../../../../components/Task/TaskCard";
import TaskModal from "../../../../components/Task/TaskModal";
import { Task } from "../../../../entities";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  useProjectTasks,
  useUpdateTask,
} from "../../../../hooks/queries/useTasks";
import { Navigate, useParams } from "react-router";
export default function Board() {
  const { projectId } = useParams();
  const { data: tasks, isLoading } = useProjectTasks(projectId || "");
  const updateTask = useUpdateTask(projectId || "");
  const lanes = Object.values(Task.Status);
  const [selectedTask, setSelectedTask] = useState<Task.Model | null>(null);
  const [editedTask, setEditedTask] = useState<Task.Model | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!projectId) {
    return <Navigate to="/projects" />;
  }

  const handleAddCard = (status: Task.StatusType) => {};

  const handleSaveCard = async () => {
    if (!editedTask) return;

    const status = editedTask.status;

    await updateTask.mutateAsync({
      taskId: editedTask.id,
      data: {
        title: editedTask.title,
        description: editedTask.description,
        status,
        storyPoints: editedTask.storyPoints,
        reporterId: editedTask.reporter?.id,
        assigneeId: editedTask.assignee?.id,
      },
    });

    setIsModalOpen(false);
  };

  const handleCardClick = (task: Task.Model) => {
    setSelectedTask(task);
    setEditedTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTask(null);
    setEditedTask(null);
    setIsModalOpen(false);
  };

  const handleEditCard = (task: Task.Model) => {
    setEditedTask(task);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const task = tasks?.find((t) => t.id === draggableId);
    if (!task) return;

    const status = destination.droppableId as Task.StatusType;

    updateTask.mutateAsync({
      taskId: task.id,
      data: {
        status,
      },
    });
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <ProjectLayout pageTitle="Board">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            width: "100%",
            maxWidth: { sm: "100%", md: "1700px" },
            overflowX: "auto",
            height: "calc(100vh - 180px)",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              p: 2,
              minWidth: "fit-content",
              height: "100%",
            }}
          >
            {lanes.map((lane: Task.StatusType) => (
              <Paper
                key={lane}
                elevation={0}
                sx={{
                  width: 280,
                  minHeight: "100%",
                  bgcolor: "background.default",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    "& .add-card-button": {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {lane} (
                    {tasks?.filter((task) => task.status === lane).length})
                  </Typography>
                  <Tooltip title={`Add card to ${lane}`}>
                    <IconButton
                      size="small"
                      className="add-card-button"
                      onClick={() => handleAddCard(lane)}
                      sx={{
                        opacity: 0,
                        transition: "opacity 0.2s",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Droppable droppableId={lane}>
                  {(provided, snapshot) => (
                    <Stack
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      spacing={1}
                      sx={{
                        p: 1.5,
                        flexGrow: 1,
                        minHeight: 0,
                        overflow: "auto",
                        transition: "background-color 0.2s",
                        bgcolor: snapshot.isDraggingOver
                          ? "action.hover"
                          : "transparent",
                      }}
                    >
                      {tasks
                        ?.filter((task) => task.status === lane)
                        .map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  opacity: snapshot.isDragging ? 0.8 : 1,
                                }}
                              >
                                <TaskCard
                                  task={task}
                                  status={lane}
                                  onSave={handleSaveCard}
                                  onClick={handleCardClick}
                                  onMaximize={handleCardClick}
                                  onEdit={handleEditCard}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </Stack>
                  )}
                </Droppable>
              </Paper>
            ))}
          </Stack>
        </Box>
      </DragDropContext>

      {selectedTask && editedTask && (
        <TaskModal
          open={isModalOpen}
          task={selectedTask}
          status={selectedTask.status}
          onClose={handleModalClose}
          onSave={handleSaveCard}
          onEdit={handleEditCard}
        />
      )}
    </ProjectLayout>
  );
}
