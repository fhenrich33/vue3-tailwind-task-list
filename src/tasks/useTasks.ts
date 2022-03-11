import { ref } from "vue";
import { Priority, Status, Task } from "./types";

/**
 * Tasks composable utilities and reactive objects.
 */
const useTasks = () => {
  /**
   * Reactive Task list.
   */
  const tasks = ref<Task[]>([]);

  /**
   * Task model sample.
   */
  const freshTask: Task = {
    id: Date.now(),
    title: "",
    description: "",
    priority: Priority.LOW,
    status: Status.BACKLOG,
  };

  const addTask = (task: Task) => {
    tasks.value = [...tasks.value, task];
  };

  const deleteTask = (task: Task) => {
    tasks.value = tasks.value.filter((t) => t.id !== task.id);
  };

  const editTask = (task: Task) => {
    const selectedTask = tasks.value.find((t) => t.id === task.id);
    tasks.value[tasks.value.indexOf(selectedTask as Task)] = task;
  };

  // Supabase / Prisma service.
  // tasks.value = [
  //   {
  //     id: Date.now() + 1,
  //     title: "LinkedIn is cringe",
  //     description: "Don't quote me on that.",
  //     status: Status.IN_PROGRESS,
  //     priority: Priority.HIGH,
  //   },
  //   {
  //     id: Date.now() + 2,
  //     title: "Get stickybugged",
  //     description: "LOL",
  //     status: Status.DONE,
  //     priority: Priority.MEDIUM,
  //   },
  //   {
  //     id: Date.now() + 3,
  //     title: "Sheeeesh",
  //     description: "It's lit fam.",
  //     status: Status.BACKLOG,
  //     priority: Priority.LOW,
  //   },
  // ];

  return {
    tasks,
    freshTask,
    addTask,
    deleteTask,
    editTask,
  };
};

export default useTasks;
