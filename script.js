// Load tasks from Local Storage and display them
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false means don't save again to Local Storage
}

// Save a new task to Local Storage
function saveTaskToStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

// Remove a task from Local Storage
function removeTaskFromStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Add a new task to the list (optionally saves it)
function addTask(taskText, save = true) {
    if (!taskText) {
        taskText = taskInput.value.trim();  // Get task input from user
    }

    if (taskText === "") {
        alert("Please enter a task.");
        return;  // Stop if no task was entered
    }

    // Create the task list item (li) and remove button
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.classList.add('remove-btn');

    // Set up the removal logic
    removeButton.onclick = function() {
        taskList.removeChild(li);
        removeTaskFromStorage(taskText); // Remove from Local Storage too
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);  // Add task to the list

    taskInput.value = "";  // Clear input field

    if (save) {
        saveTaskToStorage(taskText);  // Save to Local Storage
    }
}

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Load any existing tasks from Local Storage
    loadTasks();

    // Get references to the DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Add a new task when the "Add Task" button is clicked
    addButton.addEventListener('click', () => addTask());

    // Add a task when the Enter key is pressed in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});