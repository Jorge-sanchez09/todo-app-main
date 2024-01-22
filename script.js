const form = document.getElementById('todo-form');
const taskInput = form['new-task'];
const newTaskCompleted = form['completed'];

const todoListEl = document.querySelector('.todo__list');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const localStorage = window.localStorage;
const toggleThemeBtn = document.getElementById('toggle-theme');

let filterInputs = Array.from(document.querySelectorAll('.todo__filters input[type="radio"]'));
let selectedFilter = document.querySelector('.todo__filters input[type="radio"]:checked').value;
let itemsLeftEl = document.getElementById('items-left');
let tasks = JSON.parse(localStorage.getItem('taskList')) ?? [];
let darkTheme = localStorage.getItem('dark-theme');

toggleThemeBtn.addEventListener('click', toggleTheme);

filterInputs.forEach(input => {
    input.addEventListener('change', e => {
        selectedFilter = e.target.value;
        showTasks();
    });
})

form.addEventListener('submit', e => {
    e.preventDefault(); 
    
    if(!validateForm())
        return;

    const Task = {
        id: Date.now(),
        taskText: taskInput.value.trim(),
        completed: newTaskCompleted.checked
    };
    
    tasks.push(Task);
    localStorage.setItem('taskList', JSON.stringify(tasks));

    showTasks();
    form.reset();
});

clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    localStorage.setItem('taskList', JSON.stringify(tasks));
    showTasks();
});

todoListEl.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const draggingItem = todoListEl.querySelector('.dragging');
    const tasksItems = Array.from(todoListEl.children).filter(task => task !== draggingItem);

    let nextSibling = tasksItems.find(sibling => e.clientY <= sibling.getBoundingClientRect().y);

    todoListEl.insertBefore(draggingItem, nextSibling);
});

function getTheme(){
    if(darkTheme == "true")
        toggleTheme();
}

function toggleTheme(){
    document.body.classList.toggle('dark-theme');
    buttonIcon = document.querySelector('#toggle-theme img');

    if(document.body.classList.contains('dark-theme')){
        buttonIcon.src = "images/icon-sun.svg";
        buttonIcon.alt = "light theme icon";
    }
    else{
        buttonIcon.src = "images/icon-moon.svg";
        buttonIcon.alt = "dark theme icon";
    }

    localStorage.setItem('dark-theme', document.body.classList.contains('dark-theme'));
}

function filterTasks(){
    let filteredTasks = [];

    switch(selectedFilter){
        case 'all':
            filteredTasks = [...tasks];
            break;
        case 'active':
            filteredTasks = tasks.filter(task => !task.completed);
            break;
        case 'completed':
            filteredTasks = tasks.filter(task => task.completed);
            break;
    }

    return filteredTasks;
}

function showTasks(){
    cleanTasksHTML();
    const taskListFragment = document.createDocumentFragment();

    const filteredTasks = filterTasks();

    filteredTasks.forEach(task => {
        const taskItemEl = document.createElement('li');
        taskItemEl.classList.add('task');
        taskItemEl.draggable = true;
        taskItemEl.addEventListener('dragstart', () =>
            setTimeout(() => taskItemEl.classList.add('dragging'), 0));
        taskItemEl.addEventListener('dragend', () => taskItemEl.classList.remove('dragging'))

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = task.completed;
        taskCheckbox.addEventListener('change', () => changeTaskStatus(task.id, taskCheckbox.checked));

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.taskText;

        const taskDeleteButton = document.createElement('button');
        taskDeleteButton.innerHTML = `
            <img src="images/icon-cross.svg" alt="cross icon">
        `;
        taskDeleteButton.addEventListener('click', () => deleteTask(task.id));
        
        taskItemEl.append(taskCheckbox, taskSpan, taskDeleteButton);
        taskListFragment.appendChild(taskItemEl);
    });

    todoListEl.appendChild(taskListFragment);

    const itemsLeft = tasks.filter(task => !task.completed).length;
    itemsLeftEl.textContent = `${itemsLeft} ${itemsLeft == 1 ? 'item' : 'items'} left`;
}

function getTask(id){
    return tasks.find(task => task.id == id);
}

function deleteTask(id){
    tasks = tasks.filter(task => task !== getTask(id));
    localStorage.setItem('taskList', JSON.stringify(tasks));
    showTasks();
}

function changeTaskStatus(id, completed){
    const selectedTask = getTask(id);
    selectedTask.completed = completed;
    localStorage.setItem('taskList', JSON.stringify(tasks));
    showTasks();
}

function validateForm(){
    return taskInput.value.trim() !== '';
}

function cleanTasksHTML(){
    while(todoListEl.lastElementChild)
        todoListEl.lastElementChild.remove();
}

getTheme();
showTasks();