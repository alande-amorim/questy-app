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
  useCreateTask,
} from "../../../../hooks/queries/useTasks";
import { Navigate, useParams } from "react-router";
import { useAuthStore } from "../../../../store/useAuthStore";

export default function Board() {
  const { projectId } = useParams();
  const { data: tasks, isLoading } = useProjectTasks(projectId || "");
  const updateTask = useUpdateTask(projectId || "");
  const createTask = useCreateTask(projectId || "");
  const lanes = Object.values(Task.Status);
  const [selectedTask, setSelectedTask] = useState<Task.Model | null>(null);
  const [editedTask, setEditedTask] = useState<Task.Model | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const user = useAuthStore((state) => state.user);

  if (!projectId) {
    return <Navigate to="/projects" />;
  }

  const handleAddCard = () => {
    console.log(user);
    const newTask: Task.Model = {
      id: "",
      code: "",
      title: "",
      description: "",
      status: Task.Status.BACKLOG,
      storyPoints: 0,
      projectId,
      reporterId: user?.id || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reporter: {
        id: user?.id || "",
        name: user?.name || "",
        email: user?.email || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      assignee: null,
      metadata: {
        isEditing: true,
      },
    };
    setSelectedTask(newTask);
    setEditedTask(newTask);
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleSaveCard = async () => {
    if (!editedTask) return;

    if (isCreating) {
      await createTask.mutateAsync({
        title: editedTask.title,
        description: editedTask.description || "",
        status: editedTask.status,
        storyPoints: editedTask.storyPoints,
        reporterId: editedTask.reporter?.id || "",
        assigneeId: editedTask.assignee?.id || null,
      });
    } else {
      await updateTask.mutateAsync({
        taskId: editedTask.id,
        data: {
          title: editedTask.title,
          description: editedTask.description,
          status: editedTask.status,
          storyPoints: editedTask.storyPoints,
          reporterId: editedTask.reporter?.id,
          assigneeId: editedTask.assignee?.id,
        },
      });
    }

    setIsModalOpen(false);
    setSelectedTask(null);
    setEditedTask(null);
    setIsCreating(false);
  };

  const handleCardClick = (task: Task.Model) => {
    setSelectedTask(task);
    setEditedTask(task);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTask(null);
    setEditedTask(null);
    setIsModalOpen(false);
    setIsCreating(false);
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
                      onClick={handleAddCard}
                      sx={{
                        opacity: 0,
                        transition: "opacity 0.2s ease-in-out",
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                    >
                      <AddIcon />
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
          title={isCreating ? "Create New Task" : "Edit Task"}
        />
      )}
    </ProjectLayout>
  );
}
