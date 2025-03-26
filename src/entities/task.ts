import { TaskResponseDTO, UserDTO } from "../services/questy/http-client";

export namespace Task {
  export interface Model extends TaskResponseDTO {
    metadata?: {
      isEditing?: boolean;
    };
  }

  export type Id = Model["id"];

  export interface CreateDTO {
    title: string;
    description?: string;
    status: TaskResponseDTO["status"];
    order?: number;
    storyPoints?: number;
    reporter?: UserDTO;
    assignee?: UserDTO | null;
    metadata?: {
      isEditing?: boolean;
    };
  }

  export interface UpdateDTO extends Partial<CreateDTO> {
    id: Id;
  }

  export const create = (dto: TaskResponseDTO): Model => ({
    ...dto,
    metadata: {
      isEditing: false,
    },
  });

  export const update = (task: Model, dto: Partial<UpdateDTO>): Model => ({
    ...task,
    ...dto,
  });

  export const Status = {
    BACKLOG: "BACKLOG",
    DOING: "DOING",
    DONE: "DONE",
  } as const;
  export type StatusType = (typeof Status)[keyof typeof Status];

  export const lanes = Object.values(Status);
}
