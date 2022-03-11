import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from "@testing-library/vue";
import '@testing-library/jest-dom/extend-expect';
import App from "./App.vue";
import { Labels, Priority, Status, Task } from "./tasks/types";

const taskFactory = (task: Partial<Task>): Task => {
  return {
    id: Date.now(),
    title: "",
    description: "",
    priority: Priority.LOW,
    status: Status.BACKLOG,
    ...task,
  };
};

describe("Task List", () => {
  it("render correctly", () => {
    const taskList = render(App);

    // screen.debug();
    taskList.getByText("Task list");
  });

  it("can add new tasks", async () => {
    const myFirstTask = taskFactory({
      title: "My first task title",
      description: "My first task description",
    });

    const taskList = render(App);

    // Add task

    const addTaskBtn = taskList.getByText(Labels["add"]);
    await fireEvent.click(addTaskBtn);

    taskList.getByText("Add a new task.");

    const titleInput = taskList.getByLabelText("Title");
    const descriptionInput = taskList.getByLabelText("Description");
    const confirmAction = taskList.getByTestId("confirm-action");

    await fireEvent.update(titleInput, myFirstTask.title);
    await fireEvent.update(descriptionInput, myFirstTask.description);
    await fireEvent.click(confirmAction);

    taskList.getByText(myFirstTask.title);
    taskList.getByText(myFirstTask.description);
  });

  it("can edit a task", async () => {
    const myTaskToEdit = taskFactory({
      title: "My first task title",
      description: "My first task description",
    });

    const taskList = render(App);

    // Add task

    const addTaskBtn = taskList.getByText(Labels["add"]);
    await fireEvent.click(addTaskBtn);

    const titleInput = taskList.getByLabelText("Title");
    const descriptionInput = taskList.getByLabelText("Description");
    const confirmActionBtn = taskList.getByTestId("confirm-action");

    await fireEvent.update(titleInput, myTaskToEdit.title);
    await fireEvent.update(descriptionInput, myTaskToEdit.description);
    await fireEvent.click(confirmActionBtn);

    taskList.getByText(myTaskToEdit.title);
    taskList.getByText(myTaskToEdit.description);

    // Edit the same task

    const editBtn = taskList.getByTestId("edit-action");
    await fireEvent.click(editBtn);

    const editedTitle = "My first edited task title";
    const editedDescripion = "My first edited description";

    await fireEvent.update(titleInput, editedTitle);
    await fireEvent.update(descriptionInput, editedDescripion);
    await fireEvent.click(confirmActionBtn);

    taskList.getByText(editedTitle);
    taskList.getByText(editedDescripion);
  });

  it("can delete a task", async () => {
    const myTaskToDelete = taskFactory({
      title: "My first task title",
      description: "My first task description",
    });

    const taskList = render(App);

    // Add task

    const addTaskBtn = taskList.getByText(Labels["add"]);
    await fireEvent.click(addTaskBtn);

    const titleInput = taskList.getByLabelText("Title");
    const descriptionInput = taskList.getByLabelText("Description");
    const confirmActionBtn = taskList.getByTestId("confirm-action");

    await fireEvent.update(titleInput, myTaskToDelete.title);
    await fireEvent.update(descriptionInput, myTaskToDelete.description);
    await fireEvent.click(confirmActionBtn);

    taskList.getByText(myTaskToDelete.title);
    taskList.getByText(myTaskToDelete.description);

    // Delete the same task

    const deleteBtn = taskList.getByTestId("delete-action");
    await fireEvent.click(deleteBtn);

    await fireEvent.click(confirmActionBtn);

    await waitFor(() => {
      expect(screen.queryByText(myTaskToDelete.title)).not.toBeInTheDocument();
      expect(screen.queryByText(myTaskToDelete.description)).not.toBeInTheDocument();
    });
  });
});
