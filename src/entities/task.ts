import { User } from "./user";

export namespace Task {
  export interface Model {
    id: string;
    code: string;
    title: string;
    description?: string;
    laneId: string;
    order: number;
    storyPoints?: number;
    reporter?: User.Fields;
    assignee?: User.Fields;
    metadata?: {
      isEditing?: boolean;
    };
  }

  export type Id = Model["id"];

  export interface CreateDTO {
    title: string;
    description?: string;
    laneId: string;
    order?: number;
    storyPoints?: number;
    reporter?: User.Fields;
    assignee?: User.Fields;
    metadata?: {
      isEditing?: boolean;
    };
  }

  export interface UpdateDTO extends Partial<CreateDTO> {
    id: Id;
  }

  export const create = (dto: CreateDTO): Model => ({
    id: Math.random().toString(36).substr(2, 9),
    code: `QST-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`,
    title: dto.title,
    description: dto.description,
    laneId: dto.laneId,
    order: dto.order || 0,
    storyPoints: dto.storyPoints,
    reporter: dto.reporter,
    assignee: dto.assignee,
    metadata: dto.metadata,
  });

  export const update = (task: Model, dto: Partial<UpdateDTO>): Model => ({
    ...task,
    ...dto,
  });
}
