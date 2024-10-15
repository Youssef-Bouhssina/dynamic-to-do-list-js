// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Step 1: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 2: Define the addTask function
    function addTask() {
        // Retrieve the task input value and trim whitespace
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Step 3: Create new task and remove button elements
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add event to remove the task item when the button is clicked
        removeButton.onclick = function() {
            taskList.removeChild(taskItem);
        };

        // Append the remove button to the task item
        taskItem.appendChild(removeButton);

        // Append the task item to the task list
        taskList.appendChild(taskItem);

        // Clear the input field for the next task
        taskInput.value = "";
    }

    // Step 4: Attach event listeners
    // Event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event listener for the Enter key within the task input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Optional Step: Call addTask when the DOM content is loaded, if needed
    // addTask(); // Uncomment this if you have any pre-existing tasks you want to add on load
});

