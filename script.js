// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Step 1: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Step 2: Define the addTask function, with an optional parameter to control Local Storage saving
    function addTask(taskText, save = true) {
        // Create new task item (li) and set its text content to taskText
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create remove button, set its text content, and assign a class name
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add event to remove the task item when the button is clicked
        removeButton.onclick = function() {
            taskList.removeChild(taskItem);
            removeTaskFromLocalStorage(taskText);
        };

        // Append the remove button to the task item
        taskItem.appendChild(removeButton);

        // Append the task item to the task list
        taskList.appendChild(taskItem);

        // Save to Local Storage if save flag is true
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    // Step 3: Load tasks from Local Storage on page load
    function loadTasks() {
        // Retrieve tasks from Local Storage or initialize as an empty array
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Add each stored task to the task list
        storedTasks.forEach(taskText => addTask(taskText, false)); // Pass false to avoid redundant saving
    }

    // Step 4: Save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        // Retrieve tasks from Local Storage, add the new task, and save it back
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Step 5: Remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        // Retrieve tasks from Local Storage, filter out the task, and save the updated list back
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Step 6: Attach event listeners
    // Event listener for the "Add Task" button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = ""; // Clear input field after adding task
        } else {
            alert("Please enter a task.");
        }
    });

    // Event listener for the Enter key within the task input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText) {
                addTask(taskText);
                taskInput.value = ""; // Clear input field after adding task
            } else {
                alert("Please enter a task.");
            }
        }
    });
});

