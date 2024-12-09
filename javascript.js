document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const errorMessage = document.getElementById("error-message");

  // Add task on form submission
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();

    // Validate input
    if (task === "") {
      errorMessage.textContent = "Task cannot be empty!";
      return;
    } else if (task.length > 50) {
      errorMessage.textContent = "Task must be under 50 characters!";
      return;
    }

    errorMessage.textContent = ""; // Clear error message
    addTask(task);
    taskInput.value = ""; // Clear input field
  });

  // Function to add a task to the list
  function addTask(task) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <span>${task}</span>
        <div>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
    taskList.appendChild(listItem);

    // Add event listeners for edit and delete
    listItem
      .querySelector(".edit-btn")
      .addEventListener("click", () => editTask(listItem, task));
    listItem
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteTask(listItem));
  }

  // Function to edit a task
  function editTask(listItem, oldTask) {
    const newTask = prompt("Edit your task:", oldTask);
    if (newTask !== null && newTask.trim() !== "" && newTask.length <= 50) {
      listItem.querySelector("span").textContent = newTask.trim();
    } else if (newTask && newTask.length > 50) {
      alert("Task must be under 50 characters!");
    }
  }

  // Function to delete a task
  function deleteTask(listItem) {
    if (confirm("Are you sure you want to delete this task?")) {
      listItem.remove();
    }
  }
});
taskInput.addEventListener("input", () => {
  const maxChars = 50;
  const remaining = maxChars - taskInput.value.length;
  errorMessage.textContent =
    remaining >= 0
      ? `You have ${remaining} characters left.`
      : "Task exceeds character limit!";
});
const saveTasks = () => {
  const tasks = Array.from(taskList.children).map(
    (item) => item.querySelector("span").textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTask(task));
};

taskForm.addEventListener("submit", saveTasks);
taskList.addEventListener("click", saveTasks);
loadTasks(); // Load saved tasks on page load
