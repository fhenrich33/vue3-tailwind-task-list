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
    date: new Date().toISOString(),
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

    // TODO: make a seed function.
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
    await fireEvent.update(statusInProgressInput, "checked");
    await fireEvent.update(priorityHighInput, "checked");

    await fireEvent.click(confirmActionBtn);

    getByText(editedTitle);
    getByText(editedDescripion);
    getByText(Status.IN_PROGRESS);
    getByText(Priority.HIGH);
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

  it("mark tasks as done", async () => {
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

    // mark as done

    const markAsDone = taskList.getByLabelText("Mark as Done");

    await fireEvent.click(markAsDone);
    await fireEvent.click(confirmAction);

    taskList.getByText(Status.DONE);
  });
  it("filters tasks by date", async () => {
    const myFirstTask = taskFactory();

    const taskList = render(App);

    // Add task

    const addTaskBtn = taskList.getByText(Labels["add"]);
    await fireEvent.click(addTaskBtn);

    taskList.getByText("Add a new task.");

    const titleInput = taskList.getByLabelText("Title");
    const descriptionInput = taskList.getByLabelText("Description");
    const dateInput = taskList.getByTestId("task-date");
    const confirmAction = taskList.getByTestId("confirm-action");

    await fireEvent.update(titleInput, myFirstTask.title);
    await fireEvent.update(descriptionInput, myFirstTask.description);
    await fireEvent.update(dateInput, "2022-03-03");
    await fireEvent.click(confirmAction);

    taskList.getByText(myFirstTask.title);
    taskList.getByText(myFirstTask.description);

    // Filter by date

    const dateFilterInput = taskList.getByTestId("filter-date");
    await fireEvent.update(dateFilterInput, "2022-03-03");

    let taskCards = taskList.queryAllByTestId("task-card");
    expect(taskCards.length).toBe(1);

    await fireEvent.update(dateFilterInput, "2023-01-01");

    taskCards = taskList.queryAllByTestId("task-card");
    expect(taskCards.length).toBe(0);
  });
  
  // TODO: Storage persistance spec
  it.skip("persists tasks", () => {});
});
