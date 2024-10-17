function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    function addTask(taskText, b) {
        
    }

    storedTasks.forEach(taskText => addTask(taskText, false));
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask(taskText, save = true) {
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        removeButton.onclick = function() {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        li.appendChild(removeButton);

        taskList.appendChild(li);

        taskInput.value = "";

        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    addButton.addEventListener('click', (taskText, save = true) => {
        addTask(taskText, save);
    });

    taskInput.addEventListener('keypress', function (taskText, save = true) {
        if (event.key === 'Enter') {
            addTask(taskText, save);
        }
    });
});

