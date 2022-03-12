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
    id: 0,
    title: "",
    description: "",
    priority: Priority.LOW,
    status: Status.BACKLOG,
    date: new Date().toISOString(),
  };

  const addTask = (task: Task) => {
    task.id = Date.now();
    task.date = new Date().toISOString();
    tasks.value = [...tasks.value, task];
  };

  const deleteTask = (task: Task) => {
    tasks.value = tasks.value.filter((t) => t.id !== task.id);
  };

  const editTask = (task: Task) => {
    task.date = new Date(task.date).toISOString();
    const selectedTask = tasks.value.find((t) => t.id === task.id);
    tasks.value[tasks.value.indexOf(selectedTask as Task)] = task;
  };

  return {
    tasks,
    freshTask,
    addTask,
    deleteTask,
    editTask,
  };
};

export default useTasks;
