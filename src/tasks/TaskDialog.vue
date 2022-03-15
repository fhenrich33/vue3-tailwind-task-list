<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import Badge from "../components/Badge.vue";
import Button from "../components/Button.vue";
import Dialog from "../components/Dialog.vue";
import { toNativeDatePickerFormat } from "../dateUtils/date";
import { Task, Labels, Status, Priority, PriorityColor } from "./types";

const props = defineProps<{ task: Task; open: boolean; action: Labels }>();
const emits = defineEmits(["action", "close"]);

const currentTask = ref(props.task);
const title = ref<HTMLInputElement>();
const areFieldsValid = ref(true);

watch(
  () => props.task,
  (task) => {
    currentTask.value = task;
  }
);

const actionCopy = () => {
  if (props.action === Labels["edit"]) return `Editing "${props.task.title}"`;
  if (props.action === Labels["delete"])
    return `Do you want to delete "${props.task.title}"?`;
  if (props.action === Labels["done"])
    return `Do you want to mark "${props.task.title}" as done?`;
  return "Add a new task.";
};

const showForm = () =>
  props.action !== Labels["delete"] && props.action !== Labels["done"];

const handleSubmit = () => {
  areFieldsValid.value = Boolean(
    currentTask.value.title && currentTask.value.description
  );

  if (areFieldsValid.value) emits("action", currentTask.value);
};

onMounted(() => {
  currentTask.value.date = toNativeDatePickerFormat(currentTask.value.date);
  title.value?.focus();
});
</script>

<template>
  <Dialog v-show="open" @close="$emit('close')">
    <template #title>
      {{ action }}
    </template>

    <template #header>
      <button
        @click="$emit('close')"
        title="close"
        aria-label="Close"
        class="text-gray-300 text-4xl cursor-pointer absolute top-2 right-4"
      >
        ⨯
      </button>
    </template>

    <template #default>
      <p class="truncate">{{ actionCopy() }}</p>
      <p v-if="!areFieldsValid" class="text-pink-600">
        Title and Description cannot be empty.
      </p>

      <div v-if="showForm()" class="my-4">
        <div class="my-4" role="group">
          <label class="mr-2" for="title">Title</label>
          <input
            ref="title"
            id="title"
            class="task-input"
            :required="!areFieldsValid"
            v-model="currentTask.title"
          />
        </div>

        <div class="my-4" role="group">
          <label class="mr-2" for="description">Description</label>
          <input
            id="description"
            class="task-input"
            :required="!areFieldsValid"
            v-model="currentTask.description"
          />
        </div>

        <div class="my-4" role="radiogroup">
          <div v-for="status in Status" :key="status">
            <input
              class="mr-2 cursor-pointer"
              type="radio"
              :id="status.replace(' ', '-')"
              :value="status"
              name="task status"
              v-model="currentTask.status"
            />
            <label
              class="mr-2 cursor-pointer"
              :for="status.replace(' ', '-')"
              >{{ status }}</label
            >
          </div>
        </div>

        <div class="my-4" role="radiogroup">
          <div v-for="priority in Priority" :key="priority">
            <input
              class="mr-2 cursor-pointer"
              type="radio"
              :id="priority"
              :value="priority"
              name="task priority"
              v-model="currentTask.priority"
            />
            <label class="mr-2 cursor-pointer" :for="priority"
              ><Badge :color="PriorityColor[priority]">{{
                priority
              }}</Badge></label
            >
          </div>
        </div>

        <label class="mr-2" for="task-date">Date</label>
        <input type="date" id="task-date" data-testid="task-date" name="task-date" v-model="currentTask.date" />
      </div>
    </template>

    <template #actions>
      <Button @click="$emit('close')" color="red" data-testid="cancel-action">
        Cancel
      </Button>
      <Button @click="handleSubmit" color="green" data-testid="confirm-action">
        {{ action }}
      </Button>
    </template>
  </Dialog>
</template>
