document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Define the addTask function
    function addTask(taskText, save = true) {
        // Create a new <li> element for the task and set its text content to taskText
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a new remove button, set its text content to "Remove" and assign it a class name
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button to remove the <li> element from the task list
        removeButton.onclick = function() {
            taskList.removeChild(taskItem);
            removeTaskFromLocalStorage(taskText); // Remove task from Local Storage as well
        };

        // Append the remove button to the task item, and the task item to the task list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Save task to Local Storage if save flag is true
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    // Load tasks from Local Storage and populate the task list
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Save a new task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Attach event listener for the "Add Task" button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = ""; // Clear the task input field
        } else {
            alert("Please enter a task.");
        }
    });

    // Attach event listener for the "Enter" key within the task input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText) {
                addTask(taskText);
                taskInput.value = ""; // Clear the task input field
            } else {
                alert("Please enter a task.");
            }
        }
    });
});

