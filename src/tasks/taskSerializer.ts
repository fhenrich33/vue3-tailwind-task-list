import { Task } from "./types";

/**
 * Store tasks on local storage and retrieves existing tasks.
 * @param action Serialize or deserialize the tasks payload.
 * @param payload List of tasks to serialize or deserialize.
 * @returns When deserializing, returns the task list.
 */
export default function taskSerializerService(
  action: "serialize" | "deserialize",
  payload?: Task[]
): void | Task[] {
  if (!localStorage)
    throw new Error("Task serializer needs localStorage to work.");

  const SERIALIZED_TASKS = "SERIALIZED_TASKS";

  switch (action) {
    case "serialize":
      localStorage.setItem(SERIALIZED_TASKS, JSON.stringify(payload));
      break;
    case "deserialize":
      return JSON.parse(localStorage.getItem(SERIALIZED_TASKS) as string);
  }
}
