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
import { Task, Lane, User } from "../../../../entities";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

// Mock data - replace with actual data
const mockTasks: Task.Model[] = [
  Task.create({
    title: "Task 1",
    description: "Description 1",
    laneId: Lane.Status.BACKLOG,
    assignee: User.mock(),
  }),
  Task.create({
    title: "Task 2",
    description: "Description 2",
    laneId: Lane.Status.BACKLOG,
  }),
  Task.create({
    title: "Task 3",
    description: "Description 3",
    laneId: Lane.Status.IN_PROGRESS,
  }),
  Task.create({
    title: "Task 4",
    description: "Description 4",
    laneId: Lane.Status.DONE,
  }),
];

export default function Board() {
  const lanes = Lane.getAll();
  const [tasks, setTasks] = useState<Task.Model[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task.Model | null>(null);

  const handleAddCard = (laneId: string) => {
    const newTask = Task.create({
      title: "",
      description: "",
      laneId,
      order: 0,
      metadata: {
        isEditing: true,
      },
    });

    setTasks([newTask, ...tasks]);
  };

  const handleSaveCard = (
    laneId: string,
    taskId: string,
    title: string,
    description: string,
    updates?: Partial<Task.UpdateDTO>
  ) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return Task.update(task, {
            title,
            description,
            laneId,
            ...updates,
            metadata: {
              ...task.metadata,
              isEditing: false,
            },
          });
        }
        return task;
      })
    );
  };

  const handleCardClick = (task: Task.Model) => {
    setSelectedTask(task);
  };

  const handleModalClose = () => {
    setSelectedTask(null);
  };

  const handleEditCard = (task: Task.Model) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return Task.update(t, {
            metadata: {
              ...t.metadata,
              isEditing: true,
            },
          });
        }
        return t;
      })
    );
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a valid droppable
    if (!destination) return;

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the task that was dragged
    const task = tasks.find((t) => t.id === draggableId);
    if (!task) return;

    // Create a new array of tasks
    const newTasks = Array.from(tasks);

    // Remove the task from its original position
    newTasks.splice(
      newTasks.findIndex((t) => t.id === draggableId),
      1
    );

    // Find all tasks in the destination lane
    const destinationTasks = tasks.filter(
      (t) => t.laneId === destination.droppableId
    );

    // Calculate the new index in the overall tasks array
    const destinationIndex =
      newTasks.findIndex((t) => t.laneId === destination.droppableId) +
      destination.index;

    // Insert the task at the new position
    newTasks.splice(destinationIndex, 0, {
      ...task,
      laneId: destination.droppableId,
    });

    setTasks(newTasks);
  };

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
            {lanes.map((lane: Lane.Model) => (
              <Paper
                key={lane.id}
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
                    {lane.title} (
                    {tasks.filter((task) => task.laneId === lane.id).length})
                  </Typography>
                  <Tooltip title={`Add card to ${lane.title}`}>
                    <IconButton
                      size="small"
                      className="add-card-button"
                      onClick={() => handleAddCard(lane.id)}
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
                <Droppable droppableId={lane.id}>
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
                        .filter((task) => task.laneId === lane.id)
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
                                  laneId={lane.id}
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

      {selectedTask && (
        <TaskModal
          open={!!selectedTask}
          task={selectedTask}
          laneId={selectedTask.laneId}
          onClose={handleModalClose}
          onSave={handleSaveCard}
        />
      )}
    </ProjectLayout>
  );
}
