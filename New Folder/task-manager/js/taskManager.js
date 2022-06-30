// Create the HTML for a task
// it is a function that creates a new task with this parameters
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => `
    <li class="list-group-item" data-task-id=${id}>
        <div class="d-flex w-100 mt-2 justify-content-between align-items-center">
            <h5>${name}</h5>
            <span class="badge badge-danger">${status}</span>
        </div>
        <div class="d-flex w-100 mb-3 justify-content-between">
            <small>Assigned To: ${assignedTo}</small>
            <small>Due: ${dueDate}</small>
        </div>
        <p>${description}</p>
        <div class="d-flex w-100 justify-content-end">
            <button class="btn btn-outline-success done-button ${
              status === "TODO" ? "visible" : "invisible"
            }">Mark As Done</button>
            <button class="btn btn-outline-danger delete-button">Delete</button>
        </div>
    </li>
`;
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, assignedTo, dueDate) {
    const task = {
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: "TODO",
    };
    this.tasks.push(task);
  }

  getTaskById(taskId) {
    let foundTask;
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id === taskId) {
        foundTask = task;
      }
    }
    return foundTask;
  }

  render() {
    const taskHtmlList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const date = new Date(task.dueDate.replace(/-/g, "/"));
      const formattedDate =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );
      taskHtmlList.push(taskHtml);
    }
    const taskHtml = taskHtmlList.join("\n");
    const tasklist = document.querySelector("#taskList");
    tasklist.innerHTML = taskHtml;
  }

  save() {
    // Converts the object (this.tasks) into a JSON string to allow for easy persistent storage
    const tasksJson = JSON.stringify(this.tasks);
    // Saves the new JSON string to user's local storage
    localStorage.setItem("tasks", tasksJson);
    // converts currentId to a string to save to local storage
    const currentId = String(this.currentId);
    // Saves the currentId to localStorage so that currentId isn't reset when the page is refreshed
    localStorage.setItem("currentId", currentId);
  }

  // Before rendering anything, this function checks to see if anything is saved to local storage and, if so, grabs the data stored
  load() {
    if (localStorage.getItem("tasks")) {
      const tasksJson = localStorage.getItem("tasks");
        // Converts the string back into an object
      this.tasks = JSON.parse(tasksJson);
    }

    if (localStorage.getItem("currentId")) {
      const currentId = localStorage.getItem("currentId");
        // Converts the string back into a number
      this.currentId = Number(currentId);
    }
  }
}
