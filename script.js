document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    function addTask() {
        const taskInput = taskInput.value.trim();
        if (taskInput !== "") {
            const taskItem = document.createElement('li');
            taskItem.textContent = taskInput;
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.className = 'remove-btn';
            removeButton.onclick = function() {
                taskList.removeChild(taskItem);
            };
            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    }
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});


