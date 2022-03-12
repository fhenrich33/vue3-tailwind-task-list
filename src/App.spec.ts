import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom/extend-expect";
import App from "./App.vue";
import { Labels, Priority, Status, Task } from "./tasks/types";

const taskFactory = (task?: Partial<Task>): Task => {
  return {
    id: Date.now(),
    title: "My first task title",
    description: "My first task description",
    priority: Priority.LOW,
    status: Status.BACKLOG,
    date: new Date(),
    ...task,
  };
};

beforeEach(() => localStorage.clear());

describe("Task List", () => {
  it("render correctly", () => {
    const taskList = render(App);

    taskList.getByText("Task list");
  });

  it("can add new tasks", async () => {
    const myFirstTask = taskFactory();

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

  it("show error message if title and description fields are empty", async () => {
    const taskList = render(App);

    const addTaskBtn = taskList.getByText(Labels["add"]);
    await fireEvent.click(addTaskBtn);

    taskList.getByText("Add a new task.");

    const confirmAction = taskList.getByTestId("confirm-action");
    await fireEvent.click(confirmAction);

    taskList.getByText("Title and Description cannot be empty.");
  });

  it("can edit a task", async () => {
    const { title, description } = taskFactory();

    const { getByLabelText, getByText, getByTestId } = render(App);

    // Add task

    const addTaskBtn = getByText(Labels["add"]);
    await fireEvent.click(addTaskBtn);

    const titleInput = getByLabelText("Title");
    const descriptionInput = getByLabelText("Description");
    const statusInProgressInput = getByLabelText(Status.IN_PROGRESS);
    const priorityHighInput = getByLabelText(Priority.HIGH);
    const confirmActionBtn = getByTestId("confirm-action");

    await fireEvent.update(titleInput, title);
    await fireEvent.update(descriptionInput, description);

    await fireEvent.click(confirmActionBtn);

    getByText(title);
    getByText(description);
    getByText(Status.BACKLOG);
    getByText(Priority.LOW);

    // Edit the same task

    const editBtn = getByTestId("edit-action");
    await fireEvent.click(editBtn);

    const editedTitle = "My first edited task title";
    const editedDescripion = "My first edited description";

    await fireEvent.update(titleInput, editedTitle);
    await fireEvent.update(descriptionInput, editedDescripion);
    await fireEvent.click(statusInProgressInput);
    await fireEvent.click(priorityHighInput);

    await fireEvent.click(confirmActionBtn);

    getByText(editedTitle);
    getByText(editedDescripion);
    // TODO: Fix radio checks.
    // getByText(Status.IN_PROGRESS);
    // getByText(Priority.HIGH);
  });

  it("can delete a task", async () => {
    const myTaskToDelete = taskFactory();

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

    expect(screen.queryByText(myTaskToDelete.title)).not.toBeInTheDocument();
    expect(
      screen.queryByText(myTaskToDelete.description)
    ).not.toBeInTheDocument();
  });

  // TODO: Implement these specs.
  it.skip("mark tasks as done", () => {});
  it.skip("filters tasks by date", () => {});
  it.skip("persist tasks", () => {});
});
