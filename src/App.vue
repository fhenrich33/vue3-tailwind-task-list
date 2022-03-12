<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Task, Labels, Actions, Status } from "./tasks/types";
import useTasks from "./tasks/useTasks";
import TaskCard from "./tasks/TaskCard.vue";
import TaskDialog from "./tasks/TaskDialog.vue";
import NoPurge from "./components/NoPurge.vue";
import Button from "./components/Button.vue";
import taskSerializerService from "./tasks/taskSerializer";
import { compareDays } from "./utils/date";

const { tasks, freshTask, addTask, deleteTask, editTask } = useTasks();

const isModalOpen = ref(false);
const currentTask = ref<Task>();
const currentAction = ref<Actions>("add");
const selectedDate = ref();
const filteredTasks = computed(() => {
  if (!selectedDate.value) return tasks.value;
  return tasks.value.filter((t) => compareDays(t.date, selectedDate.value));
});

const promptAction = (
  selectedAction: typeof currentAction.value,
  selectedTask: typeof currentTask.value
) => {
  currentTask.value = selectedTask;
  currentAction.value = selectedAction;
  isModalOpen.value = true;
};

const handleAction = (task: Task) => {
  switch (currentAction.value) {
    case "add":
      addTask(task);
      break;
    case "edit":
      editTask(task);
      break;
    case "delete":
      deleteTask(task);
      break;
    case "done":
      task.status = Status.DONE;
      editTask(task);
      break;
  }

  isModalOpen.value = false;
  taskSerializerService("serialize", tasks.value);
};

const filterByDate = () => {};

onMounted(() => {
  const savedTasks = taskSerializerService("deserialize");
  if (savedTasks) tasks.value = savedTasks;
});
</script>

<template>
  <TaskDialog
    v-if="isModalOpen && currentTask"
    :task="{ ...currentTask }"
    :open="isModalOpen"
    :action="Labels[currentAction]"
    @close="isModalOpen = false"
    @action="handleAction"
  />

  <main class="sm:w-[80vw] max-w-5xl mx-2 sm:mx-auto">
    <h1 id="task-list-header" label class="text-4xl font-bold my-4">
      Task list
    </h1>
    <Button class="mb-4" color="green" @click="promptAction('add', freshTask)">
      {{ Labels["add"] }}
    </Button>
    <div class="mb-2">
      <label class="mr-2" for="date">Date</label>
      <input
        type="date"
        id="date"
        name="date"
        min="2000-01-01"
        max="2030-12-31"
        v-model="selectedDate"
        @input="filterByDate"
      />
    </div>
    <section
      aria-labelledby="task-list-header"
      class="flex items-center gap-4 flex-wrap"
    >
      <TaskCard
        v-for="task in filteredTasks"
        :key="(task.id as number)"
        :task="task"
        @done="promptAction('done', task)"
        @edit="promptAction('edit', task)"
        @delete="promptAction('delete', task)"
      />
    </section>
  </main>

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <NoPurge />
</template>
