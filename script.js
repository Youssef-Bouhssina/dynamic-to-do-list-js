// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {

    // Step 2: Select DOM Elements
    // Select the "Add Task" button and store in addButton
    const addButton = document.getElementById('add-task');

    // Select the input field and store in taskInput
    const taskInput = document.getElementById('task-input');

    // Select the unordered list and store in taskList
    const taskList = document.getElementById('task-list');

    // Step 3: Create the addTask Function
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim the task input value

        // Check if the task text is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Step 4: Task Creation and Removal
        // Create a new <li> element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the Remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Attach the click event to the remove button to delete the task
        removeButton.onclick = function() {
            taskList.removeChild(li);
        };

        // Append the Remove button to the task item and the task item to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = '';
    }

    // Step 5: Attach Event Listeners
    // Event listener for the Add Task button
    addButton.addEventListener('click', addTask);

    // Event listener for the Enter key on the task input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
