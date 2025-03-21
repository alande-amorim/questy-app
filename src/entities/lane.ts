export namespace Lane {
  export interface Model {
    id: string;
    title: string;
    order: number;
  }

  export type Id = Model["id"];

  export const Status = {
    BACKLOG: "backlog",
    IN_PROGRESS: "in-progress",
    DONE: "done",
  } as const;

  export type StatusType = (typeof Status)[keyof typeof Status];

  export const Collection = {
    BACKLOG: {
      id: Status.BACKLOG,
      title: "Backlog",
      order: 0,
    },
    IN_PROGRESS: {
      id: Status.IN_PROGRESS,
      title: "In Progress",
      order: 1,
    },
    DONE: {
      id: Status.DONE,
      title: "Done",
      order: 2,
    },
  } as const;

  export type CollectionType = (typeof Collection)[keyof typeof Collection];

  export const getById = (id: Id): Model | undefined => {
    return Object.values(Collection).find((lane) => lane.id === id);
  };

  export const getAll = (): Model[] => {
    return Object.values(Collection).sort((a, b) => a.order - b.order);
  };
}
