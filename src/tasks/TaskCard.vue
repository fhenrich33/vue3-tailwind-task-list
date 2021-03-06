<script setup lang="ts">
import { computed } from "vue";
import Badge from "../components/Badge.vue";
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
import { Task, Status, PriorityColor } from "./types";

const props = defineProps<{ task: Task }>();
defineEmits(["edit", "delete", "done"]);

const formattedDate = computed(() => new Date(props.task.date).toDateString());
</script>

<template>
  <Card role="group" data-testid="task-card" class="w-[300px] min-w-[300px] h-[240px] min-h-[240px]">
    <template #title>
      <span
        :class="[
          { 'line-through': task.status === Status.DONE },
          { 'text-gray-400': task.status === Status.BACKLOG },
        ]"
      >
        <button
          v-if="task.status !== Status.DONE"
          title="Mark as Done"
          aria-label="Mark as Done"
          @click="$emit('done', task)"
        >
          ✅
        </button>
        {{ task.title }}
      </span>
    </template>

    <template #header>
      <Badge class="my-1" :color="PriorityColor[task.priority]">{{
        task.priority
      }}</Badge>
    </template>

    <template #sub-title>
      <span class="italic text-gray-400">{{ task.status }}</span>
    </template>

    <template #default>
      <div>
        <p class="text-sm mb-1">{{ formattedDate }}</p>
        <p class="truncate">{{ task.description }}</p>
      </div>
    </template>

    <template #actions>
      <Button @click="$emit('edit')" color="blue" data-testid="edit-action">
        Edit ✏️
      </Button>
      <Button @click="$emit('delete')" color="red" data-testid="delete-action">
        Delete ❌
      </Button>
    </template>
  </Card>
</template>
