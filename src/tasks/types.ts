export type Actions = "add" | "edit" | "delete" | "done";

export enum Priority{
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

export enum Status {
  BACKLOG = "backlog",
  IN_PROGRESS = "in progress",
  DONE = "done",
}

export enum Labels {
  "add" = "Add Task 📝",
  "edit" = "Edit ✏️",
  "delete" = "Delete ❌",
  "done" = "Done ✅ ",
}

export enum PriorityColor {
  "high" = "red",
  "medium" = "yellow",
  "low" = "green",
}

export interface Task {
  id: Number | bigint;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
}
