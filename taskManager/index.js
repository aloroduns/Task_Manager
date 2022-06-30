const taskManager = new TaskManager(0);

taskManager.load();

taskManager.render();

// Select the New Task Form
const newTaskForm = document.querySelector('#newTaskForm');

// Add an 'onsubmit' event listener
newTaskForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();

    // Select the inputs
    const newTaskNameInput = document.querySelector('#newTaskNameInput');
    const newTaskDescription = document.querySelector('#newTaskDescription');
    const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
    const newTaskDueDate = document.querySelector('#newTaskDueDate');
    const errorMessage = document.querySelector('#alertMessage');

    //Validation code here
    
    // if(!validFormFieldInput(name)){
    //     errorMessage.innerHTML = "Invalid name input";
    //     errorMessage.style.display = "block"
    // }else{
    //     errorMessage.style.display = "none"
    // }

    // function validFormFieldInput(data){
    // return data !== null && data !== '';
    // }

    // Get the values of the inputs
    const name = newTaskNameInput.value;
    const description = newTaskDescription.value;
    const assignedTo = newTaskAssignedTo.value; 
    const dueDate = newTaskDueDate.value;

    taskManager.addTask(name, description, assignedTo, dueDate);

    taskManager.save();

    // Render the tasks
    taskManager.render();

    newTaskNameInput.value = '';
    newTaskDescription.value = '';
    newTaskAssignedTo.value = '';
    newTaskDueDate.value = '';
});

const tasksList = document.querySelector('#tasksList');

tasksList.addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement;

        const taskId = Number(parentTask.dataset.taskId);

        const task = taskManager.getTaskById(taskId);

        task.status = 'DONE';

        taskManager.save();

        taskManager.render();
    }

    // Check if a "Delete" button was clicked
    if (event.target.classList.contains('delete-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Delete the task
        taskManager.deleteTask(taskId);

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }
});
    let alert = document.getElementById('alert')

    if (!name || !description || !assignedTo || !dueDate) {
        let string = ""

        if (!name) {
            string += "name "
        }

        if (!description) {
            string += "description "
        }

        if (!assignedTo) {
            string += "assignedTo "
        }

        if (!dueDate) {
            string += "dueDate "
        }
        alert.innerText = string + "are missing!"
        alert.style.display = 'block'
    } else {
        alert.style.display = 'none'
    }

    taskManager.addTask(name, description, assignedTo, dueDate);

    // Render the tasks
    taskManager.render();

    newTaskNameInput.value = '';
    newTaskDescription.value = '';
    newTaskAssignedTo.value = '';
    newTaskDueDate.value = '';
;

function validFormFieldInput(data){
    
}

let alert = document.getElementById('alert')
alert.style.display = 'none'